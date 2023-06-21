import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColabService } from 'src/app/services/colab.service';

@Component({
  selector: 'app-colab',
  templateUrl: './colab.component.html',
  styleUrls: ['./colab.component.scss']
})
export class ColabComponent implements OnInit {
  shelters: any[] = [];
  actions: string[] = ['Socio', 'Voluntario', 'Casa de acogida', 'Donativo puntual'];

  colabForm!: FormGroup;

  constructor(
    private _colabService: ColabService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
  ) {
    this.colabForm = new FormGroup({
      shelter: new FormControl(),
      action: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getShelters();
  }

  private getShelters() {
    this._colabService.get().subscribe({
      next: (rtn) => {
        this.shelters = rtn.data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.colabForm = this._formBuilder.group({
          shelter: [],
          action: [],
        });
      },
    }); 
  }

  onSubmit() {
    const shelter = this.colabForm.get('shelter')?.value.name;
    const action = this.colabForm.get('action')?.value;

    this._toastrService.success(`${action} para ${shelter}`);
  }
}
