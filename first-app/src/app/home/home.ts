import { Component, inject } from "@angular/core";
import { HousingLocation } from "../housing-location/housing-location";
import { HousingLocationInfo } from "../housinglocation";
import { HousingService } from "../housing-service";

@Component({
	imports: [HousingLocation],
	selector: "app-home",
	styleUrl: "./home.css",
	template: `
		<section>
			<form>
				<input type="text" placeholder="Filter by city" />
				<button class="primary" type="button">Search</button>
			</form>
		</section>
		<section class="results">
			@for (housingLocation of housingLocationList; track housingLocation.id) {
				<app-housing-location [housingLocation]="housingLocation" />
			}
		</section>
	`,
})
export class Home {
	housingLocationList: HousingLocationInfo[] = [];
	housingService = inject(HousingService)

	constructor() {
		this.housingLocationList = this.housingService.getAllHousingLocations();
	}
}
