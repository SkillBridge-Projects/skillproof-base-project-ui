import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Job } from '../model/job';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) {}

  addJob(job: Job ,userId: number): Observable <HttpResponse<string>>{
    return this.http.post<string>(`${environment.appUrl}in/` + userId.toString() + '/new-job', job, {observe : 'response'});
  }

  getJobs(userId: number): Observable <Job[]>{
    return this.http.get<Job[]>(`${environment.appUrl}in/` + userId.toString() + '/jobs');
  }

  getRecommendedJobs(userId: number): Observable <Job[]>{
    return this.http.get<Job[]>(`${environment.appUrl}in/` + userId.toString() + '/recommended-jobs');
  }

  apply(jobId: number ,userId: number): Observable <string>{
    return this.http.put<string>(`${environment.appUrl}in/` + userId.toString() + '/jobs/make-application/' + jobId.toString() , {observe : 'response'});
  }
}
