import { Component, inject, OnInit } from '@angular/core';
import { DataSourceService } from 'src/app/shared/data-source.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    apiData: any[] = [];
    isDeleting: boolean = true;
    constructor() { }
    service = inject(DataSourceService)

    ngOnInit(): void {
        this.service.fetchFirstTenResults().subscribe({
            next: (data) => {
                this.apiData = data;
                console.log(data)
            }
        });

    }

    onSave() {
        console.log('Save button clicked');
        // Handle save logic
    }

    onDelete() {
        console.log('Delete button clicked');
        // Handle delete logic
    }

}
