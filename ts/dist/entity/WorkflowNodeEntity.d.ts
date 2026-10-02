import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { WorkflowNode, WorkflowNodeRemoveMatch } from '../LoopsTypes';
declare class WorkflowNodeEntity extends LoopsEntityBase<WorkflowNode> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: WorkflowNodeEntity): WorkflowNodeEntity;
    remove(this: any, reqmatch?: WorkflowNodeRemoveMatch, ctrl?: Control): Promise<WorkflowNodeEntity>;
}
export { WorkflowNodeEntity };
