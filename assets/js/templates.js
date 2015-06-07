(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"view-content container\">\r\n	<h1>Sign In</h1>\r\n	<form class=\"form-vertical form-login\">\r\n		<fieldset>\r\n			<div class=\"form-group\">\r\n				<input class=\"form-control\" id=\"inputEmail\" name=\"inputEmail\" placeholder=\"Email\" type=\"email\">\r\n				<span class=\"form-decoration\"></span>\r\n				<label for=\"inputEmail\" class=\"control-label\">Email</label>\r\n			</div>\r\n			<div class=\"form-group\">\r\n				<input class=\"form-control\" id=\"inputPassword\" name=\"inputPassword\" placeholder=\"Password\" type=\"password\">\r\n				<span class=\"form-decoration\"></span>\r\n				<label for=\"inputPassword\" class=\"control-label\">Password</label>\r\n			</div>\r\n			<div class=\"form-group\">\r\n				<div class=\"col-xs-6\">\r\n					<button type=\"submit\" class=\"btn btn-main\">Submit <span class=\"icon icon-lock\"></span></button>\r\n				</div>\r\n				<div class=\"col-xs-6\">\r\n					<div class=\"help-block text-right\"><a href=\"#/browse/condition\">Skip <span class=\"icon icon-angle-right\"></span></a></div>\r\n				</div>\r\n			</div>\r\n		</fieldset>\r\n	</form>\r\n</div>";
  },"useData":true});
templates['browse'] = template({"1":function(depth0,helpers,partials,data) {
  return "		<a href=\"#/browse/result\" title=\"Continue with the current selection\" class=\"btn btn-sm\">Search with current selection <span class=\"icon icon-check\"></span></a> \n		<a href=\"#/browse\" class=\"btn btn-sm reset\" title=\"Clear the current selection\">Clear selection <span class=\"icon icon-close\"></span></a>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "				<span class=\"icon icon-tag\"></span> (empty)\n";
  },"5":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "				<li>\n					<h6 class=\"help-block\">\n						<a href=\"#/browse/"
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" title=\"Select "
    + escapeExpression(lambda((data && data.key), depth0))
    + "\"><span class=\"icon icon-tag\"></span> "
    + escapeExpression(lambda((data && data.key), depth0))
    + "</a>\n					</h6>\n					<a href=\"#/browse/"
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" title=\"Select "
    + escapeExpression(lambda((data && data.key), depth0))
    + "\">"
    + escapeExpression(lambda(depth0, depth0))
    + "</a>\n				</li>\n";
},"7":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "		<li class=\"btn-pellet select\">\n			<span>"
    + escapeExpression(lambda(depth0, depth0))
    + "</span>\n		</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "<div class=\"view-content container\">\n	<div id=\"search-box\">\n		<div class=\"container\">\n			<form>\n				<div class=\"form-group\">\n					<input class=\"form-control\" id=\"searchBox\" name=\"searchBox\" placeholder=\"Find strains...\" type=\"text\">\n					<span class=\"form-decoration\"></span>\n					<label for=\"searchBox\" class=\"control-label\">Search</label>\n				</div>\n			</form>\n		</div>\n	</div>\n\n	<div class=\"text-right\">\n	<a class=\"btn btn-sm next\">Skip this step <span class=\"icon icon-angle-right\"></span></a>\n";
  stack1 = ((helpers.ifNotEmpty || (depth0 && depth0.ifNotEmpty) || helperMissing).call(depth0, (depth0 != null ? depth0.criteria : depth0), {"name":"ifNotEmpty","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "	</div>\n	<div id=\"breadcrumbs\" class=\"row\">\n		<div class=\"col-md-11\">\n			<ul class=\"breadcrumb breadcrumb-criteria\">\n";
  stack1 = ((helpers.ifEmpty || (depth0 && depth0.ifEmpty) || helperMissing).call(depth0, (depth0 != null ? depth0.criteria : depth0), {"name":"ifEmpty","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.criteria : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "			</ul>\n		</div>\n	</div>\n\n	<h1>"
    + escapeExpression(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"category","hash":{},"data":data}) : helper)))
    + "</h1>\n\n	<ul class=\"list-pellets\">\n";
  stack1 = ((helpers.getAvailableValues || (depth0 && depth0.getAvailableValues) || helperMissing).call(depth0, (depth0 != null ? depth0.data : depth0), (depth0 != null ? depth0.category : depth0), {"name":"getAvailableValues","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	</ul>\n</div>";
},"useData":true});
templates['detail'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "				<li>\r\n					<img class=\"img-thumbnail\" src=\""
    + escapeExpression(lambda(depth0, depth0))
    + "\" />\r\n				</li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"container detail-wrap\">\r\n	<div class=\"row\">\r\n		<div class=\"col-md-6\">\r\n			<h1>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h1>\r\n			<p>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.description : stack1), depth0))
    + "</p>\r\n		</div>\r\n		<div class=\"col-md-6\">\r\n			<ul class=\"list-thumbnails\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.images : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "			</ul>\r\n		</div>\r\n	</div>\r\n	<div class=\"row\">\r\n		<div class=\"col-md-6\">\r\n			<a class=\"btn btn-main\" href=\"#/browse\"><span class=\"icon icon-angle-left\"></span> Back to browse</a>\r\n		</div>\r\n	</div>\r\n</div>";
},"useData":true});
templates['patients'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"view-content container\">\r\n	<h1>Patients</h1>\r\n\r\n	<div class=\"row\">\r\n		<figure class=\"col-sm-3\">\r\n			<img class=\"img-thumbnail\" src=\"assets/img/Patient-Good-Start-Guide.jpg\" alt=\"Doctor\" />\r\n		</figure>\r\n		<div class=\"col-sm-9\">\r\n			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\r\n		</div>\r\n	</div>\r\n</div>";
  },"useData":true});
templates['doctors'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"view-content container\">\r\n	<h1>Doctors</h1>\r\n	\r\n	<div class=\"row\">\r\n		<figure class=\"col-sm-3\">\r\n			<img class=\"img-thumbnail\" src=\"assets/img/doctor.jpg\" alt=\"Doctor\" />\r\n		</figure>\r\n		<div class=\"col-sm-9\">\r\n			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\r\n		</div>\r\n	</div>\r\n\r\n</div>";
  },"useData":true});
templates['result'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "		<li>\r\n			<a class=\"btn-pellet\" href=\"#/detail/"
    + escapeExpression(lambda((depth0 != null ? depth0.id : depth0), depth0))
    + "\"><span>"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</span></a>\r\n		</li>\r\n";
},"3":function(depth0,helpers,partials,data) {
  return "	<p class=\"text-center\">No items match your search.</p>\r\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "<div class=\"view-content container\">\r\n	<h1>Result</h1>\r\n	<ul class=\"list-pellets\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.items : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "	</ul>\r\n";
  stack1 = ((helpers.ifEmpty || (depth0 && depth0.ifEmpty) || helperMissing).call(depth0, (depth0 != null ? depth0.items : depth0), {"name":"ifEmpty","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	<div class=\"form-group text-center\">\r\n		<a class=\"btn btn-main\" href=\"#/browse\">Go back</a>\r\n		<a class=\"btn btn-main reset\" href=\"#/browse\">Start over</a>\r\n	</div>\r\n</div>";
},"useData":true});
})();