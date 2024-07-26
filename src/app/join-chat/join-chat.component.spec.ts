import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinChatComponent } from './join-chat.component';

describe('JoinGroupComponent', () => {
    let component: JoinGroupComponent;
    let fixture: ComponentFixture<JoinGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [JoinChatComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(JoinChatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
