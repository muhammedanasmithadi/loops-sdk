import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { Contact, ContactListMatch } from '../LoopsTypes';
declare class ContactEntity extends LoopsEntityBase<Contact> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: ContactEntity): ContactEntity;
    list(this: any, reqmatch?: ContactListMatch, ctrl?: Control): Promise<ContactEntity[]>;
}
export { ContactEntity };
