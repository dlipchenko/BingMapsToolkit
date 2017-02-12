	  //this section handles unstructured geocoding with override values
	  function geocodeWithOverride()
	  {
		document.getElementById("outputBoxOverride").value = "Input query\tResult number\tEntity type\tConfidence\tLatitude,Longitude\tAddress Line\tLocality\tAdmin District\tPostal code\tCountry region\tAdmin District 2\tNeighborhood\tName\tRouting Coordinates\n";
		if (document.getElementById("GeocodeOverrideInput").value != "")
		{
			var inputTemp = document.getElementById("GeocodeOverrideInput").value;
			if (overrideValues[inputTemp.toUpperCase()] != 'undefined' && overrideValues[inputTemp.toUpperCase()] != null && overrideValues[inputTemp.toUpperCase()] != "")
			{
				var overrideResults = overrideValues[inputTemp.toUpperCase()];
				for (var i = 0; i < overrideResults.totalResults; i++)
				{
					if (overrideResults.resources[i].resultNumber == 1)
					{
						document.getElementById("outputBoxOverride").value += inputTemp;
					}
					document.getElementById("outputBoxOverride").value += "\t#" + overrideResults.resources[i].resultNumber + "\t" + overrideResults.resources[i].entityType + "\t" + overrideResults.resources[i].confidence + "\t" + overrideResults.resources[i].coordinates[0] + "," + overrideResults.resources[i].coordinates[1] + "\t" + overrideResults.resources[i].AddressLine + "\t" + overrideResults.resources[i].Locality + "\t" + overrideResults.resources[i].AdminDistrict + "\t" + overrideResults.resources[i].PostalCode + "\t" + overrideResults.resources[i].CountryRegion + "\t" + overrideResults.resources[i].AdminDistrict2 + "\t" + overrideResults.resources[i].Neighborhood + "\t" + overrideResults.resources[i].name + "\t" + overrideResults.resources[i].RoutingCoordinates[0] + "," + overrideResults.resources[i].RoutingCoordinates[1] + "\n";
				}
			}
			else
			{
				document.getElementById('GeocodeOverrideButton').disabled = 'disabled';
				var searchRequest = 'https://dev.virtualearth.net/REST/v1/Locations/' + inputTemp + '?output=json&jsonp=RESTLocationsUnstructuredWithOverrideCallback&inclnb=1&key=' + document.getElementById('GeneralKey').value;
				var mapscript = document.createElement('script'); 
				mapscript.type = 'text/javascript'; 
				mapscript.src = searchRequest; 
				document.getElementById('output').appendChild(mapscript); 
			}
		}
		else
		{
			document.getElementById("outputBoxOverride").value += "No unput Specified\n";
			
		}
	  }
	  function RESTLocationsUnstructuredWithOverrideCallback(result)
	  {
		 //document.getElementById("outputBoxOverride").value += "geocode result\n";
		var OverrideCounter = 0;
		if (result &&
        result.resourceSets &&
        result.resourceSets.length > 0 &&
        result.resourceSets[0].resources &&
        result.resourceSets[0].resources.length > 0) 
        {
			for (var i = 0; i < result.resourceSets[0].resources.length; i++)
			{
				//Input query\tResult number\tEntity type\tConfidence\tLatitude,Longitude\tAddress Line\tLocality\tAdmin District\tPostal code\tCountry region\tAdmin District 2\tNeighborhood\tName\tRouting Coordinates\n
				if (i == 0)
				{
					document.getElementById("outputBoxOverride").value += document.getElementById("GeocodeOverrideInput").value;
				}
				document.getElementById("outputBoxOverride").value += "\t#" + (i + 1) + "\t" + result.resourceSets[0].resources[i].entityType + "\t" + result.resourceSets[0].resources[i].confidence + "\t" + result.resourceSets[0].resources[i].point.coordinates[0] + "," + result.resourceSets[0].resources[i].point.coordinates[1] + "\t"
				//check if addressLine is present in result
				if (!(result.resourceSets[0].resources[i].address.addressLine == "" || result.resourceSets[0].resources[i].address.addressLine == 'undefined' || result.resourceSets[0].resources[i].address.addressLine == null))
				{
					document.getElementById("outputBoxOverride").value += result.resourceSets[0].resources[i].address.addressLine;
				}
				document.getElementById("outputBoxOverride").value += "\t";
				//check if locality is present in result
				if (!(result.resourceSets[0].resources[i].address.locality == "" || result.resourceSets[0].resources[i].address.locality == 'undefined' || result.resourceSets[0].resources[i].address.locality == null))
				{
					document.getElementById("outputBoxOverride").value += result.resourceSets[0].resources[i].address.locality;
				}
				document.getElementById("outputBoxOverride").value += "\t";
				//check if AdminDistrict is present in result
				if (!(result.resourceSets[0].resources[i].address.adminDistrict == "" || result.resourceSets[0].resources[i].address.adminDistrict == 'undefined' || result.resourceSets[0].resources[i].address.adminDistrict == null))
				{
					document.getElementById("outputBoxOverride").value += result.resourceSets[0].resources[i].address.adminDistrict;
				}
				document.getElementById("outputBoxOverride").value += "\t";
				//check if postalCode is present in result
				if (!(result.resourceSets[0].resources[i].address.postalCode == "" || result.resourceSets[0].resources[i].address.postalCode == 'undefined' || result.resourceSets[0].resources[i].address.postalCode == null))
				{
					document.getElementById("outputBoxOverride").value += result.resourceSets[0].resources[i].address.postalCode;
				}
				document.getElementById("outputBoxOverride").value += "\t";
				//check if countryRegion is present in result
				if (!(result.resourceSets[0].resources[i].address.countryRegion == "" || result.resourceSets[0].resources[i].address.countryRegion == 'undefined' || result.resourceSets[0].resources[i].address.countryRegion == null))
				{
					document.getElementById("outputBoxOverride").value += result.resourceSets[0].resources[i].address.countryRegion;
				}
				document.getElementById("outputBoxOverride").value += "\t";
				//check if adminDistrict2 is present in result
				if (!(result.resourceSets[0].resources[i].address.adminDistrict2 == "" || result.resourceSets[0].resources[i].address.adminDistrict2 == 'undefined' || result.resourceSets[0].resources[i].address.adminDistrict2 == null))
				{
					document.getElementById("outputBoxOverride").value += result.resourceSets[0].resources[i].address.adminDistrict2;
				}
				document.getElementById("outputBoxOverride").value += "\t";
				//check if neighborhood is present in result
				if (!(result.resourceSets[0].resources[i].address.neighborhood == "" || result.resourceSets[0].resources[i].address.neighborhood == 'undefined' || result.resourceSets[0].resources[i].address.neighborhood == null))
				{
					document.getElementById("outputBoxOverride").value += result.resourceSets[0].resources[i].address.neighborhood;
				}
				document.getElementById("outputBoxOverride").value += "\t" + result.resourceSets[0].resources[i].name + "\t";
				var RoutingCoords = null;
				if (typeof (result.resourceSets[0].resources[i].geocodePoints) == 'undefined' || result.resourceSets[0].resources[i].geocodePoints == null)
				{
					document.getElementById('outputBoxOverride').value += "\t";
				}
				else
				{
					for (var j = 0; j < result.resourceSets[0].resources[i].geocodePoints.length; j++)
					{
						for (var k = 0; k < result.resourceSets[0].resources[i].geocodePoints[j].usageTypes.length; k++)
						{
							if (result.resourceSets[0].resources[i].geocodePoints[j].usageTypes[k] == "Route")
							{
								RoutingCoords = result.resourceSets[0].resources[i].geocodePoints[j].coordinates;
							}							
						}
					}
					if (RoutingCoords == null)
					{
						RoutingCoords = result.resourceSets[0].resources[i].point.coordinates;
					}
					
					
					document.getElementById('outputBoxOverride').value += RoutingCoords + "\n";;
				}
			}
        }
        else
        {
            if (typeof (result) == 'undefined' || result == null)
            {
                document.getElementById("outputBoxOverride").value += "No response received\n";
            }
			else if (result.statusCode != 200)
			{
				document.getElementById('outputBoxOverride').value += "\tAn error has occurred\tError details: " + result.statusDescription + "\tCode " + result.statusCode + "\tTraceID: " + result.traceId + "\n";
			}
            else 
            {
                if (typeof (result) != 'undefined' && result && result && result.errorDetails)
                {
                    document.getElementById("outputBoxOverride").value +=  "Error:"  + result.errorDetails[0] + "\n";
                }
					document.getElementById("outputBoxOverride").value += "No ressults in response\n";
            
            }
        }
		document.getElementById('GeocodeOverrideButton').disabled = false;
	  }
