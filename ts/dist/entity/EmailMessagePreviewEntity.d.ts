import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { EmailMessagePreview, EmailMessagePreviewCreateData } from '../LoopsTypes';
declare class EmailMessagePreviewEntity extends LoopsEntityBase<EmailMessagePreview> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: EmailMessagePreviewEntity): EmailMessagePreviewEntity;
    create(this: any, reqdata?: EmailMessagePreviewCreateData, ctrl?: Control): Promise<EmailMessagePreviewEntity>;
}
export { EmailMessagePreviewEntity };
