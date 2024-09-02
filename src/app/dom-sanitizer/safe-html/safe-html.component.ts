import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-safe-html',
    templateUrl: './safe-html.component.html',
    styleUrls: ['./safe-html.component.scss']
})
export class SafeHtmlComponent implements OnInit {

    // Example of user-generated HTML content
    userGeneratedHtml: string = `<h1>Hello, World!</h1><script>alert('Hacked!');</script>`;

    // Sanitized HTML content
    sanitizedHtml: SafeHtml;

    // Trusted HTML content
    trustedHtml: SafeHtml;

    constructor(private sanitizer: DomSanitizer) {
        // Automatically sanitize user-generated HTML content
        this.sanitizedHtml = sanitizer.bypassSecurityTrustHtml(this.userGeneratedHtml);

        // Assume we trust this HTML content from a secure source
        const trustedContent = `<h1>Safe Content</h1><p>This content is trusted and does not need sanitization.</p>`;
        this.trustedHtml = sanitizer.bypassSecurityTrustHtml(trustedContent);
    }

    ngOnInit(): void {
    }

}
