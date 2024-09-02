import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-reusable-button',
    templateUrl: './reusable-button.component.html',
    styleUrls: ['./reusable-button.component.scss']
})
export class ReusableButtonComponent implements OnInit {
    
    @Input() label: string = 'Click Me';
    @Input() type: string = 'button'; // 'button', 'submit', etc.
    @Input() disabled: boolean = false;
    @Input() color: string = 'primary'; // 'primary', 'secondary', 'warn', etc.
    @Input() size: string = 'medium'; // 'small', 'medium', 'large'

    @Output() clicked = new EventEmitter<void>();

    ngOnInit() {
        
    }

    onClick() {
        this.clicked.emit();
    }

}
