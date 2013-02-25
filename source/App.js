function GetPageAjax(page) {
  alert('call ajax');
  
  $.ajax({
    url: page,  
    success: function(data) {
		return data; 
    },
	error: function() {
		var data = "wwwwww";
		return data;
	}
  });
}

enyo.kind({
	name: "App",
	kind: enyo.FittableRows,
	style: "",
	classes: "onyx",
	components: [
		{kind: "onyx.Toolbar", classes: 'center', content: 'User'},
		{kind: "onyx.Toolbar", classes: 'center', style:"margin-top:10px;", components: [
			{kind: "onyx.Button", content: "Information", 	ontap: "calculateWithComponent"},
			{kind: "onyx.Button", content: "Items", 		ontap: "calculateWithComponent"},
			{kind: "onyx.Button", content: "Request(s)", 	ontap: "calculateWithComponent"}
		]},
		{kind: enyo.Scroller, classes: 'center', fit: true, components: [
			{kind: "onyx.InputDecorator", classes: "inputDecorator", style: "margin-top: 50px;", components: [
				{kind: "onyx.Input", classes: "center", name: "sumControl", placeholder: "Enter sum"}
			]},
			{kind: "onyx.InputDecorator", classes: "inputDecorator", components: [
				{kind: "onyx.Input", classes: "center", name: "percentControl", placeholder: "Enter percent"}
			]},
			{tag: "div", name: "tipAmount"}
		]},
		{kind: "onyx.Toolbar", style: 'text-align: center;', components: [
			{kind: "onyx.Button", content: "User", 		ontap: "calculateWithComponent"},
			{kind: "onyx.Button", content: "House", 	ontap: "calculateWithComponent"},
			{kind: "onyx.Button", content: "Clean-off", ontap: "calculateWithComponent"},
			{kind: "onyx.Button", content: "Shop", 		ontap: "loadpage"},
			{kind: "onyx.Button", content: "Settings", 	ontap: "loadpage"}
		]},
		{kind: "PercentCalculator", name: "percentCalculator", onCalculated: "updateControls"}
	],
	create: function() {
		this.inherited(arguments);
	},
	updateControls: function(inSource, inEvent) {
		this.$.tipAmount.setContent("The tip is: " + inEvent.percentValue);

		return true; // stop bubbling
	},
	loadpage: function(inSource, inEvent) {		
		//Setup request.
		switch(inSource.content) {
			case "Shop":
				var data = GetPageAjax("../debug/pages/settings.html");
				alert(data);
				document.getElementById("app_scroller").innerHTML = data;
			break;
		}
	},
	
	calculateWithComponent: function(inSource, inEvent) {
		var sum = this.$.sumControl.hasNode().value;
		var percent = this.$.percentControl.hasNode().value;

		this.$.percentCalculator.setSum(sum);
		this.$.percentCalculator.setPercent(percent);

		this.$.percentCalculator.calculate();
	}
});