import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { SimplifiedWorkflow, SimplifiedWorkflowLoadMatch, SimplifiedWorkflowListMatch, SimplifiedWorkflowCreateData } from '../LoopsTypes';
declare class SimplifiedWorkflowEntity extends LoopsEntityBase<SimplifiedWorkflow> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: SimplifiedWorkflowEntity): SimplifiedWorkflowEntity;
    load(this: any, reqmatch?: SimplifiedWorkflowLoadMatch, ctrl?: Control): Promise<SimplifiedWorkflowEntity>;
    list(this: any, reqmatch?: SimplifiedWorkflowListMatch, ctrl?: Control): Promise<SimplifiedWorkflowEntity[]>;
    create(this: any, reqdata?: SimplifiedWorkflowCreateData, ctrl?: Control): Promise<SimplifiedWorkflowEntity>;
}
export { SimplifiedWorkflowEntity };
