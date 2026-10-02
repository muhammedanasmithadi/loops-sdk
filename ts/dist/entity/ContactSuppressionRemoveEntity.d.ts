import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { ContactSuppressionRemove, ContactSuppressionRemoveRemoveMatch } from '../LoopsTypes';
declare class ContactSuppressionRemoveEntity extends LoopsEntityBase<ContactSuppressionRemove> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: ContactSuppressionRemoveEntity): ContactSuppressionRemoveEntity;
    remove(this: any, reqmatch?: ContactSuppressionRemoveRemoveMatch, ctrl?: Control): Promise<ContactSuppressionRemoveEntity>;
}
export { ContactSuppressionRemoveEntity };
