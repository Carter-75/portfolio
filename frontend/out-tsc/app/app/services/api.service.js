import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
let ApiService = class ApiService {
    http = inject(HttpClient);
    // Dynamic API URL mapping
    get apiUrl() {
        return environment.apiUrl;
    }
    /**
     * Universal GET wrapper
     */
    getData(endpoint) {
        return this.http.get(`${this.apiUrl}/${endpoint}`);
    }
    /**
     * Universal POST wrapper
     */
    postData(endpoint, body) {
        return this.http.post(`${this.apiUrl}/${endpoint}`, body);
    }
};
ApiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ApiService);
export { ApiService };
//# sourceMappingURL=api.service.js.map