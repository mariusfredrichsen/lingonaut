import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-topbar',
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {}
