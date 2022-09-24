export class Constants {
  STATIC_IMAGE_PATH: string;
  STATIC_ICON_PATH: string;

  BASE_API_URL: string;
  API_REGISTER_PATH: string;
  API_LOGIN_PATH: string;
  API_DEPARTMENT_PATH: string;

  DEPARTMENT_LABEL: string;
  DEPARTMENT_INPUTS: any[] = [];

  constructor() {
    this.STATIC_IMAGE_PATH = "/assets/images/";
    this.STATIC_ICON_PATH = "/assets/images/icon/";

    this.BASE_API_URL = "http://localhost:5000/";
    this.API_REGISTER_PATH = 'sign_up';
    this.API_LOGIN_PATH = 'sign_in';
    this.API_DEPARTMENT_PATH = 'department';

    this.DEPARTMENT_LABEL = "Departments",
    this.DEPARTMENT_INPUTS.push({ label: "name", placeholder: "enter name", default: "", validation: ["required"] })
    this.DEPARTMENT_INPUTS.push({ label: "floor", placeholder: "select floor", default: "", validation: ["required"] })
    this.DEPARTMENT_INPUTS.push({ label: "is_active", placeholder: "select activation", default: "", validation: ["required"] })
  }
}