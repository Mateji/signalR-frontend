import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { JoinChatComponent } from './join-chat/join-chat.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { StartpageComponent } from './startpage/startpage.component';

export const routes: Routes = [
    // Redirect empty path to 'join-group' path
    { path: '', redirectTo: 'join-chat', pathMatch: 'full' },

    // Route to the 'JoinGroupComponent' when the path is 'join-group'
    { path: 'join-chat', component: JoinChatComponent },

    // Route to the 'ChatComponent' when the path is 'chat'
    {
        path: 'chat',
        component: ChatComponent,
        children: [
            { path: '', component: StartpageComponent },
            { path: ':group', component: GroupChatComponent },
        ],
    },
];
