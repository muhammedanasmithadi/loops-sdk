import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { Workflow, WorkflowRemoveMatch } from '../LoopsTypes';
declare class WorkflowEntity extends LoopsEntityBase<Workflow> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: WorkflowEntity): WorkflowEntity;
    remove(this: any, reqmatch?: WorkflowRemoveMatch, ctrl?: Control): Promise<WorkflowEntity>;
}
export { WorkflowEntity };
