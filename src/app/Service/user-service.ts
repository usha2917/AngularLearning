/**
 * User Service
 * Handles all user-related API operations
 * Provides centralized data management for user information
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserModel } from '../Models/user-model';
import { API_CONFIG, ApiConfig } from '../Core/config/api.config';
import { LoggerService } from '../Core/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly usersEndpoint = '/users';

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private apiConfig: ApiConfig,
    private logger: LoggerService
  ) {}

  /**
   * Fetches all users from the API
   * @returns Observable of UserModel array
   */
  getUsers(): Observable<UserModel[]> {
    const url = `${this.apiConfig.baseUrl}${this.usersEndpoint}`;
    this.logger.debug('Fetching users from', { url });
    
    return this.http.get<UserModel[]>(url).pipe(
      catchError((error) => {
        this.logger.error('Failed to fetch users', error);
        throw error;
      })
    );
  }

  /**
   * Fetches a single user by ID
   * @param id User ID
   * @returns Observable of UserModel
   */
  getUserById(id: number): Observable<UserModel> {
    const url = `${this.apiConfig.baseUrl}${this.usersEndpoint}/${id}`;
    this.logger.debug('Fetching user by ID', { id, url });
    
    return this.http.get<UserModel>(url).pipe(
      catchError((error) => {
        this.logger.error(`Failed to fetch user with ID ${id}`, error);
        throw error;
      })
    );
  }
}
