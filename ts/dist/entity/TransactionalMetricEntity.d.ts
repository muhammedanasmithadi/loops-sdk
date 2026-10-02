import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { TransactionalMetric, TransactionalMetricLoadMatch } from '../LoopsTypes';
declare class TransactionalMetricEntity extends LoopsEntityBase<TransactionalMetric> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: TransactionalMetricEntity): TransactionalMetricEntity;
    load(this: any, reqmatch?: TransactionalMetricLoadMatch, ctrl?: Control): Promise<TransactionalMetricEntity>;
}
export { TransactionalMetricEntity };
