import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Post } from '../model/post';
import { Comment } from '../model/comment';
import { InterestReaction } from '../model/interestReaction';
import { Chat } from '../model/chat';
import { Message } from '../model/message';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {}

  newMessage(message: Message,userId: number,chatId: number): Observable<HttpResponse<string>>{
    return this.http.post<string>(`${environment.appUrl}in/` + userId.toString() + '/chat/'+chatId.toString()+'/new-message', message, {observe : 'response'});
  }

  getChats(userId: number): Observable<Chat[]>{
    return this.http.get<Chat[]>(`${environment.appUrl}in/` + userId.toString() + '/chats');
  }

}
