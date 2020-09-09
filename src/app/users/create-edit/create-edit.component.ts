import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from './must-match.validator';
import {GeoDataService} from '../../geo-data.service';
import {UserService} from '../../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IUser} from '../../users';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {
  isCreate = this.route.snapshot.url.join() === 'create';
  user: IUser;
  createForm: FormGroup;
  submitted = false;
  regions: {};
  districts: {};
  townShips: {};
  towns: {};
  constructor(private formBuilder: FormBuilder, private geoDataService: GeoDataService,
              private userService: UserService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.geoDataService.getRegions().subscribe(data => this.regions = data);
    // fill in the data when access the Edit form
    if (!this.isCreate) {
      const userId = this.route.snapshot.url[1].path;
      this.userService.getUser(userId).subscribe(data => {
        this.user = data;
        this.onChangeRegion(this.user.geoRegionId);
        this.onChangeDistrict(this.user.geoDistrictId);
        this.onChangeTownShip(this.user.geoTownShipId);
        this.createForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          geoRegionId: this.user.geoRegionId,
          geoDistrictId: this.user.geoDistrictId,
          geoTownShipId: this.user.geoTownShipId,
          geoTownId: this.user.geoTownId
        });
      });
    }
    // create-edit reactive form
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), this.isCreate ? Validators.required : Validators.nullValidator]],
      confirmPassword: ['', this.isCreate ? Validators.required : Validators.nullValidator],
      geoRegionId: ['', Validators.required],
      geoDistrictId: ['', Validators.required],
      geoTownShipId: ['', Validators.required],
      geoTownId: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }
  // getter for easy access to form fields
  get f(): any { return this.createForm.controls; }
  onSubmit(): void {
    this.submitted = true;
    // validate to submit
    if (this.createForm.invalid) {
      return;
    }
    const data = {
      name: this.f.name.value,
      email: this.f.email.value,
      password: this.f.password.value,
      password_confirmation: this.f.confirmPassword.value,
      geoRegionId: this.f.geoRegionId.value,
      geoDistrictId: this.f.geoDistrictId.value,
      geoTownShipId: this.f.geoTownShipId.value,
      geoTownId: this.f.geoTownId.value
    };
    // submit to store or update based on the isCreate state
    if (this.isCreate) {
      this.userService.store(data).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.userService.update(data, this.user.id).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
  onChangeRegion(regionId: number): any {
    this.geoDataService.getDistricts(regionId).subscribe(data => this.districts = data);
  }
  onChangeDistrict(districtId: number): any {
    this.geoDataService.getTownShips(districtId).subscribe(data => this.townShips = data);
  }
  onChangeTownShip(townShipId: number): any {
    this.geoDataService.getTowns(townShipId).subscribe(data => this.towns = data);
  }
}
