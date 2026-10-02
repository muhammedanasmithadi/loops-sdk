import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { EmailMessageGuardian, EmailMessageGuardianLoadMatch } from '../LoopsTypes';
declare class EmailMessageGuardianEntity extends LoopsEntityBase<EmailMessageGuardian> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: EmailMessageGuardianEntity): EmailMessageGuardianEntity;
    load(this: any, reqmatch?: EmailMessageGuardianLoadMatch, ctrl?: Control): Promise<EmailMessageGuardianEntity>;
}
export { EmailMessageGuardianEntity };
