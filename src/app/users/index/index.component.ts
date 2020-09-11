import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {UserService} from '../../user.service';
import {IUser} from '../../users';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
@Injectable()
export class IndexComponent implements OnInit{
  nameSearchBox = '';
  emailSearchBox = '';
  p = 1;
  users: IUser[];
  @ViewChild('searchForm', {static: true}) searchForm: NgForm;
  constructor(private http: HttpClient, private userService: UserService) {
  }
  // tslint:disable-next-line:typedef
  onSearch(): void {
    this.userService.index(this.searchForm.value.name, this.searchForm.value.email)
      .subscribe((data) => {
        this.users = data;
        this.nameSearchBox = this.searchForm.value.name;
        this.emailSearchBox = this.searchForm.value.email;
      });
  }
  onDelete(id): void {
    if (!confirm('Are you sure about that?')){
      return;
    }
    this.userService.delete(id).subscribe(() => {
      this.ngOnInit();
    });
  }
  onEmail(email, name): void {
    this.userService.email(email, name).subscribe(() => {
      console.log('email sent!');
    });
  }
  onExport(): void {
    this.userService.export(this.nameSearchBox, this.emailSearchBox);
  }
  ngOnInit(): void {
    this.userService.index('', '').subscribe(data => this.users = data);
  }
}
