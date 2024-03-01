import express from 'express';
import sql from 'mssql';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import PDFDocument from 'pdfkit';

import bodyParser from 'body-parser';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const dbConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	server: process.env.DB_SERVER,
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 3000
	},
	options: {
		trustServerCertificate: true, // change to true for local dev / self-signed certs
		enableArithAbort: true
	}
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

// Get all clients data
app.get('/clients', async (req, res) => {
	try {
		sql.connect(dbConfig);

		const result = await sql.query`SELECT * FROM Client`;
		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset); // Send the query results
		} else {
			res.status(404).json({ success: false, message: 'No data found' });
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Get a single client by ID
app.get('/clients/:id', async (req, res) => {
	const clientNumber = req.params.id;

	try {
		sql.connect(dbConfig);

		const result = await sql.query`SELECT * FROM Client WHERE ClientNumber = ${clientNumber}`;
		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset); // Send the query results
		} else {
			res.status(404).json({ success: false, message: 'No data found' });
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.post('/clients/packages/create', async (req, res) => {
	try {
		let {
			clientNumber,
			packageNumber,
			packageState,
			dueDate,
			serviceID,
			priorityLevel,
			externalComment
		} = req.body.packageData;

		sql
			.connect(dbConfig)
			.then(() => {
				// For the DateReceived, we can use the SQL GETDATE() function to get the current date and time
				// instead of passing data from the client side...
				return sql.query`INSERT INTO Package
			(PackageNumber, ClientNumber, DateReceived, State, ExternalComment, DueDate, PriorityLevel, ServiceID)
			VALUES
			(CONVERT(INT,${packageNumber}), ${clientNumber}, GETDATE(), ${packageState}, ${externalComment}, CONVERT(DATE, ${dueDate}), ${priorityLevel}, ${serviceID})
			`;
			})
			.then((result) => {
				if (result.rowsAffected > 0) {
					res.status(200).json({ success: true, message: 'Data inserted successfully', result });
				} else {
					res.status(404).json({ success: false, message: 'No data inserted' });
				}
			})
			.catch((err) => {
				console.error(err);
				res.status(404).json({ success: false, message: 'Error' });
			});
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.get('/clients/:id/packages', async (req, res) => {
	const clientNumber = req.params.id;

	try {
		sql.connect(dbConfig);

		const result = await sql.query`
		SELECT
		PackageNumber, ClientNumber, [State], ServiceDescription, PriorityLevel, DateReceived, DueDate, DateCompleted, StaffID, StaffAssigned, InternalComment, ExternalComment
		FROM Package
		left join Services on Package.ServiceID = Services.ServiceID
		WHERE ClientNumber = ${clientNumber}`;
		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset); // Send the query results
		} else {
			res.status(404).json({ success: false, message: 'No data found' });
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.get('/clients/packages/:id', async (req, res) => {
	const packageNumber = req.params.id;
	try {
		sql.connect(dbConfig);

		const result = await sql.query`
		SELECT
		PackageNumber, ClientNumber, [State], ServiceDescription, PriorityLevel, DateReceived, DueDate, DateCompleted, StaffID, StaffAssigned, InternalComment, ExternalComment
		FROM Package
		left join Services on Package.ServiceID = Services.ServiceID
		WHERE PackageNumber = ${packageNumber}`;

		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset); // Send the query results
		} else {
			res.status(404).json({ success: false, message: 'No data found' });
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Put request
app.put('/clients/packages/edit', async (req, res) => {
	try {
		const {
			clientNumber,
			packageNumber,
			dueDate,
			requestType,
			priorityLevel,
			externalComment,
			codeStatus
		} = req.body;

		sql
			.connect(dbConfig)
			.then(() => {
				return sql.query`UPDATE Package
                                SET
                                    CodeStatus = ${codeStatus},
                                    ExternalComment = ${externalComment},
                                    DueDate = CONVERT(DATE, ${dueDate}),
                                    PriorityLevel = ${priorityLevel},
                                    RequestType = ${requestType}
                                WHERE
                                    PackageNumber = ${packageNumber} AND
                                    ClientNumber = ${clientNumber}`;
			})
			.then((result) => {
				console.dir(result);
				if (result.rowsAffected > 0) {
					res.json({ success: true, message: 'Data updated successfully' });
				} else {
					res.status(404).json({ success: false, message: 'No matching record found for update' });
				}
			})
			.catch((err) => {
				console.error(err);
				res
					.status(500)
					.json({ success: false, message: 'An error occurred during database operation' });
			});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: 'An error occurred while processing the request' });
	}
});

// DELETE route to delete a package
app.delete('/clients/packages/:id', async (req, res) => {
	try {
		const { id } = req.params; // Get the document ID from request parameters

		// Connect to the database and perform the delete operation
		sql
			.connect(dbConfig)
			.then(() => {
				// Construct the DELETE query to delete the document
				const deleteQuery = `DELETE FROM Package WHERE DocumentID = ?`;
				return sql.query(deleteQuery, id);
			})
			.then((result) => {
				console.dir(result);
				if (result.affectedRows > 0) {
					res.json({ success: true, message: 'Document deleted successfully' });
				} else {
					res
						.status(404)
						.json({ success: false, message: 'No matching document found for delete' });
				}
			})
			.catch((err) => {
				console.error(err);
				res
					.status(500)
					.json({ success: false, message: 'An error occurred during database operation' });
			});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: 'An error occurred while processing the request' });
	}
});

// PATCH request - WIP - Not tested
app.patch('/clients/packages/:id', async (req, res) => {
	try {
		const { id } = req.params; // Get the document ID from request parameters
		const updatedFields = req.body; // Get the updated fields from request body

		// Connect to the database and perform the update operation
		sql
			.connect(dbConfig)
			.then(() => {
				// Construct the UPDATE query to update specific fields of the document
				const updateQuery = `UPDATE Package SET ? WHERE DocumentID = ?`;
				return sql.query(updateQuery, [updatedFields, id]);
			})
			.then((result) => {
				console.dir(result);
				if (result.affectedRows > 0) {
					res.json({ success: true, message: 'Document updated successfully' });
				} else {
					res
						.status(404)
						.json({ success: false, message: 'No matching document found for update' });
				}
			})
			.catch((err) => {
				console.error(err);
				res
					.status(500)
					.json({ success: false, message: 'An error occurred during database operation' });
			});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ success: false, message: 'An error occurred while processing the request' });
	}
});

// GEt all packages
app.get('/packages', async (req, res) => {
	try {
		sql.connect(dbConfig);

		const result = await sql.query`
		SELECT
		PackageNumber, ClientNumber, [State], ServiceDescription, PriorityLevel, DateReceived, DueDate, DateCompleted, StaffID, StaffAssigned, InternalComment, ExternalComment
		FROM Package
		left join Services on Package.ServiceID = Services.ServiceID
		`;

		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset); // Send the query results
		} else {
			res.status(404).json({ success: false, message: 'No data found' });
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Get all serviceTypes
app.get('/services', async (req, res) => {
	try {
		sql.connect(dbConfig);

		const result = await sql.query`SELECT * FROM Services`;
		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset); // Send the query results
		} else {
			res.status(404).json({ success: false, message: 'No data found' });
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.post('/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		await sql.connect(dbConfig);
		const result = await sql.query`SELECT * FROM Client`;

		if (result.recordset.length > 0) {
			// Login successful
			res.json({ success: true, message: 'Login successful' });
		} else {
			// Login failed
			res.status(401).json({ success: false, message: 'Invalid credentials' });
		}
	} catch (err) {
		res.status(500).json({ success: false, message: 'An error occurred' });
	}
});

app.post('/addreviewform', async (req, res) => {
	//const formData = req.body;
	sql.connect(dbConfig);

	const result = sql.query();
	if (result) {
		res.json({ success: true, message: 'form Added successfully' });
	} else {
		res.status(500).json({ success: false, message: 'An error occurred' });
	}
});

app.post('/updatereviewform', async (req, res) => {
	//const formData = req.body;
	sql.connect(dbConfig);

	const result = sql.query();
	if (result) {
		res.json({ success: true, message: 'form update successfully' });
	} else {
		res.status(500).json({ success: false, message: 'An error occurred' });
	}
});

app.post('/completedreviewform', (req, res) => {
	sql.connect(dbConfig);
	const result = sql.query();
	if (result) {
		res.json({ success: true, message: 'list fetch successfully', result: result });
	} else {
		res.status(500).json({ success: false, message: 'An error occurred' });
	}
});

app.put('/updateItem/:id', async (req, res) => {
	const itemId = req.params.id;
	const updatedData = req.body;

	try {
		await sql.connect(dbConfig);

		await sql.query`
            UPDATE YourTableName
            SET Field1 = ${updatedData.field1}, Field2 = ${updatedData.field2}
            WHERE ID = ${itemId}
        `;

		res.json({ success: true, message: 'Item updated successfully' });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
});

app.get('/masterpage', async (req, res) => {
	try {
		await sql.connect(dbConfig);
		const sqlQuery = `
		SELECT
		p.PackageNumber,
		CONCAT(c.FirstName, ' ', c.LastName) AS ClientName,
		p.DateReceived,
		p.CodeStatus AS State,
		p.StaffAssigned AS AssignedTo,
		p.DocumentName AS DocNames,
		p.ExternalComment,
		d.Priority,
		d.DocumentNumber,
		d.InvoiceNumber,
		p.ReviewerNotes,
		d.TimeSpent,
		p.CodeStatus,
		p.DateCompleted,
		i.Subtotal,
		'Rate' AS Rate, -- Replace 'Rate' with actual calculation or column, if applicable
		i.Grandtotal AS Total
	FROM Package p
	LEFT JOIN Client c ON p.ClientNumber = c.ClientNumber
	LEFT JOIN Document d ON p.PackageNumber = d.PackageNumber
	LEFT JOIN Invoice i ON d.InvoiceNumber = i.InvoiceNumber;
        `;
		const result = await sql.query(sqlQuery);

		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset); // Send the query results
		} else {
			res.status(404).json({ success: false, message: 'No data found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

app.get('/api/packages/assigned-to-me', async (req, res) => {
	try {
		await sql.connect(dbConfig);
		// const currentUser = req.user.id; // When we have a way to identify the user
		const sqlQuery = `
			SELECT
			p.PackageNumber,
			CONCAT(c.FirstName, ' ', c.LastName) AS ClientName,
			CONVERT(date, p.DateReceived) AS DateReceived,
			p.CodeStatus AS State,
			p.StaffAssigned AS AssignedTo,
			p.DocumentName AS DocNames,
			p.ExternalComment,
			d.Priority,
			d.DocumentNumber,
			d.InvoiceNumber,
			p.ReviewerNotes,
			d.TimeSpent,
			p.CodeStatus,
			CONVERT(date, p.DateCompleted) AS DateCompleted,
			i.Subtotal,
			'Rate' AS Rate,
			i.Grandtotal AS Total
			FROM Package p
			JOIN Client c ON p.ClientNumber = c.ClientNumber
			JOIN Document d ON p.PackageNumber = d.PackageNumber
			JOIN Invoice i ON d.InvoiceNumber = i.InvoiceNumber
            WHERE p.StaffAssigned = 'Emily Jones'
        `;
		const result = await sql.query(sqlQuery);
		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset); // Send the query results
		} else {
			res.status(404).json({ success: false, message: 'No data found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

app.get('/api/packages/assigned', async (req, res) => {
	try {
		await sql.connect(dbConfig);
		const sqlQuery = `
		SELECT
		p.PackageNumber,
		CONCAT(c.FirstName, ' ', c.LastName) AS ClientName,
		p.DateReceived,
		p.CodeStatus AS State,
		p.StaffAssigned AS AssignedTo,
		p.DocumentName AS DocNames,
		p.ExternalComment,
		d.Priority,
		d.DocumentNumber,
		d.InvoiceNumber,
		p.ReviewerNotes,
		d.TimeSpent,
		p.CodeStatus,
		p.DateCompleted,
		i.Subtotal,
		'Rate' AS Rate,
		i.Grandtotal AS Total
		FROM Package p
		JOIN Client c ON p.ClientNumber = c.ClientNumber
		JOIN Document d ON p.PackageNumber = d.PackageNumber
		JOIN Invoice i ON d.InvoiceNumber = i.InvoiceNumber
    	WHERE p.StaffAssigned is NOT NULL
        `;
		const result = await sql.query(sqlQuery);
		// Handle response as in your original route
		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset); // Send the query results
		} else {
			res.status(404).json({ success: false, message: 'No data found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

app.get('/api/packages/unassigned', async (req, res) => {
	try {
		await sql.connect(dbConfig);
		const sqlQuery = `SELECT
		p.PackageNumber,
		CONCAT(c.FirstName, ' ', c.LastName) AS ClientName,
		p.DateReceived,
		p.CodeStatus AS State,
		p.StaffAssigned AS AssignedTo,
		p.DocumentName AS DocNames,
		p.ExternalComment,
		d.Priority,
		d.DocumentNumber,
		d.InvoiceNumber,
		p.ReviewerNotes,
		d.TimeSpent,
		p.CodeStatus,
		p.DateCompleted,
		i.Subtotal,
		'Rate' AS Rate,
		i.Grandtotal AS Total
	FROM Package p
	LEFT JOIN Client c ON p.ClientNumber = c.ClientNumber
	LEFT JOIN Document d ON p.PackageNumber = d.PackageNumber
	LEFT JOIN Invoice i ON d.InvoiceNumber = i.InvoiceNumber
	WHERE p.StaffAssigned IS NULL OR p.StaffID IS NULL`;
		const result = await sql.query(sqlQuery);
		// Handle response as in your original route
		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset); // Send the query results
		} else {
			res.status(404).json({ success: false, message: 'No data found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

app.get('/api/packages/pending-approval', async (req, res) => {
	try {
		await sql.connect(dbConfig);
		const sqlQuery = `
		SELECT
		p.PackageNumber,
		CONCAT(c.FirstName, ' ', c.LastName) AS ClientName,
		p.DateReceived,
		p.CodeStatus AS State,
		p.StaffAssigned AS AssignedTo,
		p.DocumentName AS DocNames,
		p.ExternalComment,
		d.Priority,
		d.DocumentNumber,
		d.InvoiceNumber,
		p.ReviewerNotes,
		d.TimeSpent,
		p.CodeStatus,
		p.DateCompleted,
		i.Subtotal,
		'Rate' AS Rate,
		i.Grandtotal AS Total
		FROM Package p
		JOIN Client c ON p.ClientNumber = c.ClientNumber
		JOIN Document d ON p.PackageNumber = d.PackageNumber
		JOIN Invoice i ON d.InvoiceNumber = i.InvoiceNumber
		WHERE CodeStatus = 'pending'`;
		const result = await sql.query(sqlQuery);
		// Handle response as in your original route
		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset); // Send the query results
		} else {
			res.status(404).json({ success: false, message: 'No data found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

app.get('/api/invoices', async (req, res) => {
	try {
		await sql.connect(dbConfig);
		const sqlQuery = `
		SELECT
		CONVERT(date, i.InvoiceDate) AS InvoiceDate,
		i.InvoiceNumber,
		COUNT(DISTINCT p.PackageNumber) AS NumberOfPackages,
		COUNT(DISTINCT d.DocumentNumber) AS NumberOfDocuments,
		MAX(i.Status) AS Status -- Assuming Status can be aggregated, or you might need a different approach
	FROM Invoice i
	LEFT JOIN Document d ON i.InvoiceNumber = d.InvoiceNumber
	LEFT JOIN Package p ON d.PackageNumber = p.PackageNumber
	GROUP BY
		CONVERT(date, i.InvoiceDate),
		i.InvoiceNumber`;
		const result = await sql.query(sqlQuery);
		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset);
		} else {
			res.status(404).json({ success: false, message: 'No data found' });
		} // Send the query results
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

app.get('/invoices/:InvoiceNumber', async (req, res) => {
	console.log(`Fetching invoice: ${req.params.InvoiceNumber}`);
	const { InvoiceNumber } = req.params; // Extract the invoice number from the URL
	try {
		await sql.connect(dbConfig);
		const sqlQuery = `
		SELECT
		i.DateCompleted,
		i.ServicesRendered,
		i.ProjectNameLocation,
		i.HoursWorked,
		i.OvertimeHours,
		i.RegularRate,
		i.OvertimeRate,
		i.Subtotal,
		i.GrandTotal
	FROM Invoice i
	WHERE i.InvoiceNumber = @invoiceNumber`; // Use a parameterized query for security

		// Prepare and execute the SQL query with the parameter
		const request = new sql.Request();
		request.input('InvoiceNumber', sql.VarChar, InvoiceNumber);
		const result = await request.query(sqlQuery);

		if (result.recordset.length > 0) {
			res.setHeader('Content-Type', 'application/json');
			res.json(result.recordset); // Send the detailed invoice data
		} else {
			res.status(404).json({ success: false, message: 'Invoice not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Server Error');
	}
});

app.put('/invoices/:InvoiceNumber', async (req, res) => {
	const { InvoiceNumber } = req.params; // Extract the InvoiceNumber from the URL
	const {
		DateCompleted,
		ServicesRendered,
		ProjectNameLocation,
		HoursWorked,
		OvertimeHours,
		RegularRate,
		OvertimeRate,
		Subtotal
	} = req.body;

	try {
		await sql.connect(dbConfig);
		const query = `
            UPDATE Invoice
            SET
                DateCompleted = @DateCompleted,
                ServicesRendered = @ServicesRendered,
                ProjectNameLocation = @ProjectNameLocation,
                HoursWorked = @HoursWorked,
                OvertimeHours = @OvertimeHours,
                RegularRate = @RegularRate,
                OvertimeRate = @OvertimeRate,
                Subtotal = @Subtotal
            WHERE InvoiceNumber = @InvoiceNumber`;

		// Create a new request to execute the query
		const request = new sql.Request();
		request.input('InvoiceNumber', sql.VarChar, InvoiceNumber);
		request.input('DateCompleted', sql.Date, DateCompleted);
		request.input('ServicesRendered', sql.VarChar, ServicesRendered);
		request.input('ProjectNameLocation', sql.VarChar, ProjectNameLocation);
		request.input('HoursWorked', sql.Float, HoursWorked);
		request.input('OvertimeHours', sql.Float, OvertimeHours);
		request.input('RegularRate', sql.Float, RegularRate);
		request.input('OvertimeRate', sql.Float, OvertimeRate);
		request.input('Subtotal', sql.Float, Subtotal);

		await request.query(query);

		res.json({ success: true, message: 'Invoice updated successfully.' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false, message: 'Failed to update invoice.' });
	}
});

app.post('/generate-pdf', (req, res) => {
	const invoiceData = [
		{
			DateCompleted: '2024-02-14',
			ServicesRendered: 'Web Development',
			ProjectNameLocation: 'New York',
			HoursWorked: 8,
			OvertimeHours: 2,
			RegularRate: 50,
			OTRate: 75,
			Total: 475
		},
		{
			DateCompleted: '2024-02-15',
			ServicesRendered: 'System Analysis',
			ProjectNameLocation: 'Project Beta',
			HoursWorked: 6,
			OvertimeHours: 3,
			RegularRate: 60,
			OTRate: 90,
			Total: 540
		},
		{
			DateCompleted: '2024-02-16',
			ServicesRendered: 'Consultation',
			ProjectNameLocation: 'Texas',
			HoursWorked: 4,
			OvertimeHours: 0,
			RegularRate: 70,
			OTRate: 105,
			Total: 280
		}
	];

	const invoicesPath = 'C:\\Users\\yugi_\\Documents\\invoices';

	// Corrected filePath to use the specified directory
	const filename = `invoice_${Date.now()}.pdf`;
	const filePath = `${invoicesPath}\\${filename}`;

	const doc = new PDFDocument();
	const writeStream = fs.createWriteStream(filePath);
	doc.pipe(writeStream);

	doc
		.font('Helvetica-Bold')
		.fontSize(16)
		.text('TinaKing Integrity', 50, 50)
		.text('Consulting Services Inc.', 50, 65);
	doc
		.fontSize(10)
		.text('240 Southridge NW, Edmonton, Alberta, Canada', 50, 85)
		.text('Postal Code: T6H 4M9', 50, 100)
		.text('E-Mail: k_emoryone@gmail.com', 50, 115)
		.text('Business Number', 50, 130)
		.text('GST #:', 50, 145);
	doc
		.text('Project Name:', 350, 50)
		.text('Contract Name:', 350, 65)
		.text('Timesheet', 350, 80)
		.text('Date Submited:', 350, 95)
		.text('Invoice Date:', 350, 110)
		.text('Bank:', 350, 125)
		.text('Account Number:', 350, 140)
		.text('WCB#:', 350, 155);

	const headers = [
		{ title: 'Date', position: 50 },
		{ title: 'Services', position: 110 },
		{ title: 'Project', position: 200 },
		{ title: 'Reg Hours', position: 300 },
		{ title: 'OT Hours', position: 360 },
		{ title: 'Reg.$/hr', position: 410 },
		{ title: 'OT. $/hr', position: 460 },
		{ title: '$Can', position: 510 }
	];

	// Table columns setup
	const tableTop = 200;

	headers.forEach((header) => {
		doc
			.fontSize(9)
			.text(header.title, header.position, tableTop, { continued: false, align: 'left' });
	});

	// Draw the table lines and fill in the rows with data
	let currentY = tableTop + 20;

	invoiceData.forEach((item, index) => {
		let y = tableTop + 20 + index * 20;
		doc
			.fontSize(9)
			.text(item.DateCompleted, 50, y)
			.text(item.ServicesRendered, 110, y)
			.text(item.ProjectNameLocation, 200, y)
			.text(item.HoursWorked, 300, y)
			.text(item.OvertimeHours, 360, y)
			.text(item.RegularRate, 410, y)
			.text(item.OTRate, 460, y)
			.text(item.Total, 510, y);
		// Continue for other fields...

		// Alternate row background color
		// if (index % 2 === 0) {
		// 	doc
		// 		.rect(50, y - 10, 500, 20)
		// 		.fillOpacity(0.1)
		// 		.fillAndStroke('#DDDDDD', '#AAAAAA')
		// 		.fillOpacity(1);
		// }
	});

	doc.fillColor('black');

	// Add totals
	const totalsPositionY = currentY + 80;
	doc
		.text('Sub-total in CAD', 50, totalsPositionY)
		.text('GST', 50, totalsPositionY + 20)
		.text('Grand Total', 50, totalsPositionY + 40);

	doc.end();
	writeStream.on('finish', () => {
		res.json({
			success: true,
			message: 'PDF generated'
		});
	});

	// Error handling for writeStream
	writeStream.on('error', (error) => {
		res
			.status(500)
			.json({ success: false, message: 'Error generating PDF', error: error.toString() });
	});
});
