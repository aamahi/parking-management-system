import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  private apiUrl = 'http://localhost:5000'
  constructor(
    private http: HttpClient
  ) { }

  getList() {
    return this.http.get(`${this.apiUrl}/parking?_sort=id&&_order=desc`)
  }

  public createParkInfo(parkingInfo: any) {
    return this.http.post('http://localhost:5000/parking', parkingInfo);
  }

  getDetails(id: number) {
    return this.http.get(`${this.apiUrl}/parking/${id}`);
  }
  getCategory(type: any) {
    return this.http.get(`${this.apiUrl}/parking?category=${type}&&status=In`);
  }

  updateParking(payload: any, id: any) {
    return this.http.put(`${this.apiUrl}/parking/${id}`, payload);
  }

}
