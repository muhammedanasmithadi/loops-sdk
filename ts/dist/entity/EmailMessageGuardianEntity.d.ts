import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { EmailMessageGuardian, EmailMessageGuardianListMatch } from '../LoopsTypes';
declare class EmailMessageGuardianEntity extends LoopsEntityBase<EmailMessageGuardian> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: EmailMessageGuardianEntity): EmailMessageGuardianEntity;
    list(this: any, reqmatch?: EmailMessageGuardianListMatch, ctrl?: Control): Promise<EmailMessageGuardianEntity[]>;
}
export { EmailMessageGuardianEntity };
