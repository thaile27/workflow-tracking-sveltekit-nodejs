<!-- <h1>welcome to the review page</h1> -->
<script>
	import NavBar from '../../components/NavBar.svelte';
	let fcaw = true;
	let formdata = {
		wpsNo:0,
		weldingType:"Select Welding Type",
		backing:false,
		backingType:"Select backing",
		otherTypeBacking:"",
		service:{
			type:"Sour",
			OtherType:"",
			q1:"true",
			q2:false
		},
		base_metal:{
			pNumberFrom:"",
			groupFrom:"",
			pNumberTo:"",
			groupTo:"",
			unsNumberFrom:"",
			unsNumberTo:"",
			materialFrom:"",
			materialTo:"",
			chemicalanalysis:"false",
			thicknessQ1:"true",
			thicknessQ2:"false",
			maxPasThickeness:"false",
		},
		filler:{
			sfa:"false",
			fno:"false",
			ano:"false",
			metal_same_pqr:"false",
			wps_match_pqr:"false",
			metal_used_on:"false",
			groove:{
				q1:"true",
				q2:"false"

			}
		},
		fillerMetal:{

			q1:"false",
			q2:"false",
			q3:"false",
			consumable_insert_used:"false",
			modeOfTransfer:"Select Mode",
			transferMatchPQR:"false;"
		},
		position:{
			name:"All",
			progession:"up",
			restricted:"false",
			comment:""
		}

	}
	function handlewps(){
		console.log(formdata);
	}
</script>

<header>
	<NavBar pageH1="" links={[{ path: '/landing', name: 'Landing', class_style: '' }]} />
</header>
<section class="p-3">
	<div class="container" >
		<ul class="nav nav-tabs" id="myTab" role="tablist">
			<li class="nav-item" role="presentation">
				<button
					class="nav-link active"
					id="home-tab"
					data-bs-toggle="tab"
					data-bs-target="#home"
					type="button"
					role="tab"
					aria-controls="home"
					aria-selected="true">WPS</button
				>
			</li>
			<li class="nav-item" role="presentation">
				<button
					class="nav-link"
					id="profile-tab"
					data-bs-toggle="tab"
					data-bs-target="#profile"
					type="button"
					role="tab"
					aria-controls="profile"
					aria-selected="false">Drawing</button
				>
			</li>
		</ul>
		<div class="tab-content p-2" id="myTabContent" >
			<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
				<form>
					<div class="d-flex align-items-center my-2 p-2 primarycolor">
						<div class="fs-4 col-4 ml-3 csecondary"><strong> WPS No: </strong></div>
						<input
							type="text"
							class="form-control bg-light"
							aria-label="Small"
							aria-describedby="inputGroup-sizing-sm"
							placeholder="Type here..."
							bind:value = {formdata.wpsNo}
						/>
					</div>
					<div class="d-flex align-items-start my-2 p-2 primarycolor">
						<div class="fs-4 col-4 ml-3 csecondary"><strong>Welding Process: </strong></div>
						<div class="dropdown col-8 d-flex flex-column fs-5">
							<div>
								<select bind:value ={formdata.weldingType}>
									<option value="Select Welding Type">Select Welding Type</option>
									<option value="Flux Core Arc Welding">Flux Core Arc Welding</option>
									<option value="Shielded Metal Arc Welding">Shielded Metal Arc Welding</option>
									<option value="Gas Tungsten Arc Welding">Gas Tungsten Arc Welding</option>
									<option value="Gas Metal Arc Welding">Gas Metal Arc Welding</option>
								</select>
							</div>
							<div class="form-check my-2 ms-2">
								<input
									class="form-check-input fs-5"
									type="checkbox"
									bind:checked={formdata.backing}
									id="backing"
									on:change={handlewps}
								/>
								<label class="form-check-label l fs-5" for="backing">Backing</label>
							</div>
							{#if formdata.backing}
							<div>
								<select bind:value ={formdata.backingType}>
									<option value="Select backing" selected>Select Backing Type</option>
									<option value="Weld Metal">Weld Metal</option>
									<option value="Strip">Strip</option>
									<option value="Non-fusing">Non Fusing</option>
									<option value="Fusing">Fusing</option>
									<option value="Other">Other</option>
								</select>
								<br>
								{#if formdata.backingType=="Other"}
								<div class="mt-3 col-3">
									<input type="text"	class="form-control bg-light " aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Type here..." bind:value = {formdata.otherTypeBacking}/>
								</div>
								{/if }
								{#if formdata.type=="Sour"}

								{/if}
							</div>
							
							{/if}
						</div>
					</div>
					<div class="d-flex align-items-start my-2 p-2 primarycolor">
						<div class="fs-4 col-4 ml-3 csecondary"><strong>Service </strong></div>
						<div class="dropdown col-8 d-flex flex-column fs-6">
							<div>
								<label><input class="fs-5 mx-1" type="radio" name="serviceType" value="Sour" bind:group={formdata.service.type}>Sour</label>
								<label><input class="fs-5 mx-1" type="radio" name="serviceType" value="Other" bind:group={formdata.service.type}>Other</label>
								{#if formdata.service.type=="Other"}
								<div class="mt-3 col-3">
									<input type="text"	class="form-control bg-light " aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Type here..." bind:value = {formdata.otherTypeBacking}/>
								</div>	
								{/if}
								{#if formdata.service.type=="Sour"}
								<div class="d-flex justify-content-start">
									<span class="col-6">is there hardness to MR0103 or SP0472</span>
									<div class="">
										<span><input class="fs-5 mx-1" type="radio" name="Service_type_q1" value="true" bind:group={formdata.service.q1}>Yes</span>
										<span><input class="fs-5 mx-1" type="radio" name="Service_type_q1" value="false" bind:group={formdata.service.q1}>No</span>		
									</div>
								</div>
								{#if formdata.service.q1=="false"}
									
								<div class="d-flex justify-content-start mt-2">
									<span class="col-6">is there hardness to MR0175 prior to 2009</span>
									<div class="">
										<span><input class="fs-5 mx-1" type="radio" name="Service_type_q2" value="true" bind:group={formdata.service.q2}>Yes</span>
										<span><input class="fs-5 mx-1" type="radio" name="Service_type_q2" value="false" bind:group={formdata.service.q2}>No</span>	
									</div>
								</div>
								{/if}
								{/if}
							</div>
							
						</div>
					</div>
					<div class="d-flex p-2 my-2 primarycolor flex-column primarycolor">
						<h4 class="ps-2">Base Metal:</h4>
						<div class="col-12 d-flex justify-content-end align-items-center">
							<p class=""><span class="mx-1">P-Number *:</span><input class="mx-1 col-1" type="text" name="pNumber" bind:value={formdata.base_metal.pNumberFrom}>
							   <span class="mx-1">Group:</span><input class="mx-1 col-1" type="text" name="Group" bind:value={formdata.base_metal.groupFrom}>
							   <strong>To</strong>  
							   <span class="mx-1">P-Number *:</span><input class="mx-1 col-1" type="text" name="pNumber" bind:value={formdata.base_metal.pNumberTo}>
							   <span>Group:</span><input class="mx-1 col-1" type="text" name="Group" bind:value={formdata.base_metal.groupTo}>
							</p>			
						</div>
						<div class="col-12 d-flex justify-content-end align-items-center">
							<p class=""><span class="mx-1">UNS Number *:</span><input class="mx-1 col-1" type="text" name="pNumber" bind:value={formdata.base_metal.unsNumberFrom}>
							   <span class="mx-1">Material:</span><input class="mx-1 col-1" type="text" name="Group" bind:value={formdata.base_metal.materialFrom}>  
							   <strong>To</strong>
							   <span class="mx-1">UNS Number:</span><input class="mx-1 col-1" type="text" name="pNumber" bind:value={formdata.base_metal.unsNumberTo}>
							   <span>Material:</span><input class="mx-1 col-1" type="text" name="Group" bind:value={formdata.base_metal.materialTo}>
							</p>			
						</div>

					
						<div class="d-flex flex-row align-items-start">
							<div class="col-4 csecondary px-3 d-flex justify-content-end">
								<strong class="pl-2">Chemical Analysis</strong>
							</div>
							<div class="input-group input-group-sm mb-3 ">
								<span><input class="fs-5 mx-1" type="radio" name="chemicalanalysis" value="true" bind:group={formdata.service.chemicalanalysis}>Yes</span>
								<span><input class="fs-5 mx-1" type="radio" name="chemicalanalysis" value="false" bind:group={formdata.service.chemicalanalysis}>No</span>		
							</div>
						</div>
						<div class="d-flex flex-row align-items-start">
							<div class="col-4 csecondary px-3 d-flex justify-content-end">
								<strong class="pl-2">Thickness range</strong>
							</div>
							<div class="col-6 d-flex flex-column align-items-start ">
								<div class="d-flex w-100 justify-content-between">
									<span class="">is The max thickness equal to less than 2*T</span>
									<div class="mx-4">
										<span><input class="fs-5 mx-1" type="radio" name="thicknessQ1" value="true" bind:group={formdata.base_metal.thicknessQ1}>Yes</span>
										<span><input class="fs-5 mx-1" type="radio" name="thicknessQ1" value="false" bind:group={formdata.base_metal.thicknessQ1}>No</span>	
									</div>
								</div>
								{#if formdata.base_metal.thicknessQ1=="false"}
								<div class="d-flex w-100 mt-3 justify-content-between">
									<span class="">is The max thickness equal to less than 8"</span>
									<div class="mx-4">
										<span><input class="fs-5 mx-1" type="radio" name="thicknessQ2" value="true" bind:group={formdata.base_metal.thicknessQ2}>Yes</span>
										<span><input class="fs-5 mx-1" type="radio" name="thicknessQ2" value="false" bind:group={formdata.base_metal.thicknessQ2}>No</span>	
									</div>
								</div>
								{/if}
								
							</div>
							
						</div>
						<div class="d-flex flex-row align-items-start mt-2">
							<div class="col-4 csecondary px-3 d-flex justify-content-end">
								<strong class="pl-2">Max Pass Thickness</strong>
							</div>
							<div class="col-6 d-flex flex-column align-items-start ">
								<div class="d-flex w-100 justify-content-between">
									<span class="">is The max pass thickness greater than 13mm</span>
									<div class="mx-4">
										<span><input class="fs-5 mx-1" type="radio" name="maxPasThickeness" value="true" bind:group={formdata.base_metal.maxPasThickeness}>Yes</span>
										<span><input class="fs-5 mx-1" type="radio" name="maxPasThickeness" value="false" bind:group={formdata.base_metal.maxPasThickeness}>No</span>	
									</div>
								</div>
				
								
							</div>
							
						</div>
						
					</div>
					<div class="d-flex p-2 my-2 flex-column primarycolor">
						<h4 class="ps-2">Filler</h4>
			
						<div class="d-flex flex-row align-items-center">
							<div class=" col-5 csecondary justify-content-end align-items-center d-flex px-3">
								<h6>SFA correct?</h6>
							</div>
							<div class="">
								<span><input class="fs-5 mx-1" type="radio" name="sfa" value="true" bind:group={formdata.filler.sfa}>Yes</span>
								<span><input class="fs-5 mx-1" type="radio" name="sfa" value="false" bind:group={formdata.filler.sfa}>No</span>
							</div>
						</div>
						<div class="d-flex my-1 flex-row align-items-center">
							<div class=" col-5 csecondary justify-content-end align-items-center d-flex px-3">
								<h6>Is F No. Correct ?</h6>
							</div>
							<div class="">
								<span><input class="fs-5 mx-1" type="radio" name="fno" value="true" bind:group={formdata.filler.fno}>Yes</span>
								<span><input class="fs-5 mx-1" type="radio" name="fno" value="false" bind:group={formdata.filler.fno}>No</span>
							</div>
						</div>
						<div class="d-flex my-1 flex-row align-items-center">
							<div class=" col-5 csecondary justify-content-end align-items-center d-flex px-3">
								<h6>Is A. No. Correct ?</h6>
							</div>
							<div class="">
								<span><input class="fs-5 mx-1" type="radio" name="ano" value="true" bind:group={formdata.filler.ano}>Yes</span>
								<span><input class="fs-5 mx-1" type="radio" name="ano" value="false" bind:group={formdata.filler.ano}>No</span>
							</div>
						</div>
						<div class="d-flex my-1 flex-row align-items-center">
							<div class=" col-5 csecondary justify-content-end align-items-center d-flex px-3">
								<h6>Size of filler metal same as PQR?</h6>
							</div>
							<div class="">
								<span><input class="fs-5 mx-1" type="radio" name="metal_same_pqr" value="true" bind:group={formdata.filler.metal_same_pqr}>Yes</span>
								<span><input class="fs-5 mx-1" type="radio" name="metal_same_pqr" value="false" bind:group={formdata.filler.metal_same_pqr}>No</span>
							</div>
						</div>
						<div class="d-flex my-1 flex-row align-items-center">
							<div class=" col-5 csecondary justify-content-end align-items-center d-flex px-3">
								<h6>Does the product form on the WPS match that on the PQR?</h6>
							</div>
							<div class="">
								<span><input class="fs-5 mx-1" type="radio" name="wps_match_pqr" value="true" bind:group={formdata.filler.wps_match_pqr}>Yes</span>
								<span><input class="fs-5 mx-1" type="radio" name="wps_match_pqr" value="false" bind:group={formdata.filler.wps_match_pqr}>No</span>
							</div>
						</div>
						<div class="d-flex my-1 flex-row align-items-center">
							<div class=" col-5 csecondary justify-content-end align-items-center d-flex px-3">
								<h6>Supplemental filler metal used on PQR?</h6>
							</div>
							<div class="">
								<span><input class="fs-5 mx-1" type="radio" name="metal_used_on" value="true" bind:group={formdata.filler.metal_used_on}>Yes</span>
								<span><input class="fs-5 mx-1" type="radio" name="metal_used_on" value="false" bind:group={formdata.filler.metal_used_on}>No</span>
							</div>
						</div>
						<div class="d-flex my-1 flex-row align-items-center">
							<div class=" col-5 csecondary justify-content-end align-items-center d-flex px-3">
								<h6>Deposit Thickness Qualified</h6>
							</div>
						</div>
						<div class="d-flex my-1 flex-row align-items-center">
							<div class="col-5 csecondary justify-content-end align-items-center d-flex px-3">
								<h6>Groove</h6>
							</div>
							<div class="d-flex flex-column col-5">
								<div class="d-flex justify-content-between">
									<span> Is this equal to 2 * coupon thickness </span>
									<div>
										<span><input class="fs-5 mx-1" type="radio" name="grooveq1" value="true" bind:group={formdata.filler.groove.q1}>Yes</span>
										<span><input class="fs-5 mx-1" type="radio" name="grooveq1" value="false" bind:group={formdata.filler.groove.q1}>No</span>
									</div>
								</div>
								{#if formdata.filler.groove.q1 =="false"}
								<div class="d-flex justify-content-between my-2">
									<span> Is thickness equal to 8". </span>
									<div>
										<span><input class="fs-5 mx-1" type="radio" name="grooveq2" value="true" bind:group={formdata.filler.groove.q2}>Yes</span>
										<span><input class="fs-5 mx-1" type="radio" name="grooveq2" value="false" bind:group={formdata.filler.groove.q2}>No</span>
									</div>
								</div>

								{/if}
							</div>
						</div>

						<div class="d-flex my-1 flex-row align-items-center">
							<div class="col-12 csecondary justify-content-start align-items-center d-flex px-3">
								<h6>Filler metal information</h6>
							</div>
						</div>
						
						{#if formdata.weldingType=="Shielded Metal Arc Welding" || formdata.weldingType=="Flux Core Arc Welding"}
						<div class="d-flex my-1 flex-row align-items-start">
							<div class="col-5 csecondary justify-content-end align-items-start d-flex px-3 mt-2">
								<h6>Electrode Flux classification</h6>
							</div>
							<div class="d-flex flex-column col-5">
								<div class="d-flex justify-content-between">
									<span> Is Flux name Stated? </span>
									<div>
										<span><input class="fs-5 mx-1" type="radio" name="fillermentalq1" value="true" bind:group={formdata.fillerMetal.q1}>Yes</span>
										<span><input class="fs-5 mx-1" type="radio" name="fillermetalq1" value="false" bind:group={formdata.fillerMetal.q1}>No</span>
									</div>
								</div>
								{#if formdata.fillerMetal.q1 =="true"}
								<div class="d-flex justify-content-between my-2">
									<span> Is flux trade name correctly stated". </span>
									<div>
										<span><input class="fs-5 mx-1" type="radio" name="fillermetalq2" value="true" bind:group={formdata.fillerMetal.q2}>Yes</span>
										<span><input class="fs-5 mx-1" type="radio" name="fillermetalq2" value="false" bind:group={formdata.fillerMetal.q2}>No</span>
									</div>
								</div>
								{/if}

								{#if formdata.fillerMetal.q2 =="true"}
								<div class="d-flex justify-content-between my-2">
									<span> Was this stated as the manufacture address?" </span>
									<div>
										<span><input class="fs-5 mx-1" type="radio" name="fillermetalq3" value="true" bind:group={formdata.fillerMetal.q3}>Yes</span>
										<span><input class="fs-5 mx-1" type="radio" name="fillermetalq3" value="false" bind:group={formdata.fillerMetal.q3}>No</span>
									</div>
								</div>

								{/if}
							</div>
						</div>
						{/if}
						<div class="d-flex my-1 flex-row align-items-start">
							<div class="col-5 csecondary justify-content-end align-items-start d-flex px-3 mt-1">
								<h6>Consumable insert used?</h6>
							</div>
							<div class="d-flex flex-column col-5">
								<div class="d-flex justify-content-between">
									<div>
										<span><input class="fs-5 mx-1" type="radio" name="consumable_insert" value="true" bind:group={formdata.fillerMetal.consumable_insert_used}>Yes</span>
										<span><input class="fs-5 mx-1" type="radio" name="consumable_insert" value="false" bind:group={formdata.fillerMetal.consumable_insert_used}>No</span>
									</div>
								</div>
							</div>
						</div>
						{#if formdata.weldingType=="Gas Tungsten Arc Welding" || formdata.weldingType=="Flux Core Arc Welding"}
							<div class="d-flex my-1 flex-row align-items-start">
								<div class="col-5 csecondary justify-content-end align-items-start d-flex px-3 mt-1">
									<h6>Mode Of Transfer</h6>
								</div>
								<div class="d-flex flex-column col-7 ">
									<select bind:value ={formdata.fillerMetal.modeOfTransfer} class="col-5">
										<option value="Select Mode" selected>Select Mode</option>
										<option value="Globular">Globular</option>
										<option value="Spray or Short Circuit">Spray or Short Circuit</option>
									</select>
									<div class="d-flex justify-content-start mt-3">
										<span class="col-7">Mode of transfer matches that on the PQR?</span>
										<div class="">
											<span><input class="fs-5 mx-1" type="radio" name="transferMatchPQR" value="true" bind:group={formdata.fillerMetal.transferMatchPQR}>Yes</span>
											<span><input class="fs-5 mx-1" type="radio" name="transferMatchPQR" value="false" bind:group={formdata.fillerMetal.transferMatchPQR}>No</span>		
										</div>
									</div>
								</div>
							</div>
						{/if}
						
						
					</div>

					<div class="d-flex align-items-start my-2 p-2 primarycolor flex-column">
						<div class="row d-flex w-100">
							<h4 class="ps-2 col-4">Position</h4>
							<div class="col-6">
								<select bind:value={formdata.position.name}>
									<option value="All" selected>All</option>
									<option value="Flat">Flat</option>
									<option value="Horizontal">Horizontal</option>
									<option value="Overhead Vertical">Overhead Vertical</option>
								</select>
							</div>
						</div>
						<div class="row d-flex w-100 mt-2">
							<div class="col-5 d-flex justify-content-end csecondary">
								<h6>Is the progression</h6>
							</div>
							<div class="col-6">
								<span><input class="fs-5 mx-1" type="radio" name="progession" value="up" bind:group={formdata.position.progession}>Up</span>
								<span><input class="fs-5 mx-1" type="radio" name="progession" value="down" bind:group={formdata.position.progession}>Down</span>		
							</div>
						</div>
						<div class="row d-flex w-100 mt-2">
							<div class="col-5 d-flex justify-content-end csecondary">
								<h6>Is there a progression restriction by the client?</h6>
							</div>
							<div class="col-6 flex-column">
								<div>
									<span><input class="fs-5 mx-1" type="radio" name="restricted" value="true" bind:group={formdata.position.restricted}>Yes</span>
									<span><input class="fs-5 mx-1" type="radio" name="restricted" value="false" bind:group={formdata.position.restricted}>No</span>		
								</div>
								{#if formdata.position.restricted=="true"}		

								<textarea class="w-100 mt-3" placeholder="comment here">
								</textarea>
								{/if}
							</div>
						</div>

					</div>
				</form>
			</div>
			<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
				working on Drawing
			</div>
		</div>
	</div>
</section>

<style>
	section {
		height: 100%;
		margin: 0px;
		padding: 0px;
		background-color: #ebf3f7;
	}
	.form-control {
		background-color: rgba(0, 102, 153, 0.9);
	}
	.csecondary {
		color: #192e41;
	}
	#myTabContent {
		background-color: #006699;
	}
	.primarycolor{
		background-color: #BBC8DE;
	}
	select{
		outline:none;
		border:none;
		padding:5px 10px;
	}
	input[type="radio"]{
		accent-color: #192E41;
	}
	input,textarea{
		outline:none;
	}

</style>
