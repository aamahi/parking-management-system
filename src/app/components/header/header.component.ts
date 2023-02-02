import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() isBookCreate : EventEmitter<boolean> = new EventEmitter<boolean>();
  parkingList: any = '';
  isOpenCreateForm = false;
  isEdit = false;
  parkingValue: any;

  openModal () {
    this.isOpenCreateForm = !this.isOpenCreateForm;
  }
  categories: string[] = ["MicroBus", "Car", "Truck"];
  status: string[] = ["In", "Out"];
  constructor (
    private commonService: CommonService,
    private router: Router
  ) { }

  parkingForm = new FormGroup({
    license: new FormControl('', Validators.required),
    ownerName: new FormControl('', Validators.required),
    ownerPhone: new FormControl('', [Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    ownerAddress: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    entryTime: new FormControl('', Validators.required),
    exitTime: new FormControl('', Validators.required),
  })

  currentTimeAndDate() {
    return new Date().toISOString().substring(0, 16);
  }

  closeModal() {
    this.isOpenCreateForm = false;
    this.parkingForm.reset();
  }

  createParking () {
    const payload = {
      license: this.parkingForm?.get('license')?.value,
      ownerName: this.parkingForm?.get('ownerName')?.value,
      ownerPhone: this.parkingForm?.get('ownerPhone')?.value,
      ownerAddress: this.parkingForm?.get('ownerAddress')?.value,
      status: this.parkingForm?.get("status")?.value,
      category: this.parkingForm?.get("category")?.value,
      entryTime: this.parkingForm?.get("entryTime")?.value,
      exitTime: this.parkingForm?.get("exitTime")?.value,
      charge: 0,
    }
    if (this.parkingForm?.get('category')?.value === "MicroBus") {
      payload.charge = 30;
    }else if (this.parkingForm?.get('category')?.value === "Car") {
      payload.charge = 40;
    }
    else if (this.parkingForm?.get('category')?.value === "Truck") {
      payload.charge = 50;
    }
    this.commonService.createParkInfo(payload).subscribe((res) => {
      if (res) {
        this.getList();
        this.isOpenCreateForm = false;
        this.isBookCreate.next(true);
        this.parkingForm.reset();
      }
    })
  }

  ngOnInit () {
    this.getList();
  }

  getList () {
    this.commonService.getList().subscribe((response) => {
      if(response) {
        this.parkingList = response;
      }
    })
  }



  edit(id: number) {
    this.commonService.getDetails(id).subscribe((res)=>{
      if(res) {
        this.isEdit = true;
        this.isOpenCreateForm = true;
        this.parkingValue = res;
      }
    })
  }

  updateParking(id: number) {
    const updatePayload = {
      license: this.parkingForm?.get('license')?.value,
      ownerName: this.parkingForm?.get('ownerName')?.value,
      ownerPhone: this.parkingForm?.get('ownerPhone')?.value,
      ownerAddress: this.parkingForm?.get('ownerAddress')?.value,
      status: this.parkingForm?.get("status")?.value,
      category: this.parkingForm?.get("category")?.value,
      entryTime: this.parkingForm?.get("entryTime")?.value,
      exitTime: this.parkingForm?.get("exitTime")?.value,
      charge: 0,
    }
    if (this.parkingForm?.get('category')?.value === "MicroBus") {
      updatePayload.charge = 30;
    }else if (this.parkingForm?.get('category')?.value === "Car") {
      updatePayload.charge = 40;
    }
    else if (this.parkingForm?.get('category')?.value === "Truck") {
      updatePayload.charge = 50;
    }

    console.log(updatePayload);
    debugger

    this.commonService.updateParking(updatePayload, id).subscribe((res)=> {
      if (res) {
        this.getList();
        this.isOpenCreateForm = false;
      }
    })
  }


}
