import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { EmailMetric, EmailMetricLoadMatch } from '../LoopsTypes';
declare class EmailMetricEntity extends LoopsEntityBase<EmailMetric> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: EmailMetricEntity): EmailMetricEntity;
    load(this: any, reqmatch?: EmailMetricLoadMatch, ctrl?: Control): Promise<EmailMetricEntity>;
}
export { EmailMetricEntity };
