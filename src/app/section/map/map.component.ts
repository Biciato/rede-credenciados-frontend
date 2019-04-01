import { Component, ViewChildren, QueryList, EventEmitter, Output, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.scss']
})

export class MapComponent {
    @ViewChildren('stateEl') stateEls: QueryList<any>;

    @Output() stateName = new EventEmitter<string>();

    constructor(private renderer: Renderer2) {}

    getStateName(event, stateName) {
        event.preventDefault();
        // selects element parent to set class name active
        const parentEl = event.target.parentElement;
        // selects the link with class name active and remove it
        const a = document.getElementsByClassName('active');
        if (a.length === 1) {
            this.renderer.removeClass(a[0], 'active');
        }
        // sends state name to the parent component via Observable
        this.stateName.emit(stateName);
        // sets the state clicked with class name active
        this.renderer.addClass(parentEl, 'active');
    }
}
