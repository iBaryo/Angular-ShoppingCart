import { Injectable, InjectionToken } from "@angular/core";
import { User } from "../models/user";

export const GIGYA_CDP = new InjectionToken("gigya cdp");

@Injectable({
  providedIn: "root",
})
export class ReportService {
  constructor() {
  }

  onAddToCart(payload: { product: string; category: string }) {
  }

  onLogin(user: User) {
  }
}
