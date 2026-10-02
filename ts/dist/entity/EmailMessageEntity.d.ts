import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { EmailMessage, EmailMessageLoadMatch, EmailMessageCreateData } from '../LoopsTypes';
declare class EmailMessageEntity extends LoopsEntityBase<EmailMessage> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: EmailMessageEntity): EmailMessageEntity;
    load(this: any, reqmatch?: EmailMessageLoadMatch, ctrl?: Control): Promise<EmailMessageEntity>;
    create(this: any, reqdata?: EmailMessageCreateData, ctrl?: Control): Promise<EmailMessageEntity>;
}
export { EmailMessageEntity };
