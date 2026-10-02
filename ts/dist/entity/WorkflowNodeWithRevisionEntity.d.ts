import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { WorkflowNodeWithRevision, WorkflowNodeWithRevisionLoadMatch, WorkflowNodeWithRevisionCreateData } from '../LoopsTypes';
declare class WorkflowNodeWithRevisionEntity extends LoopsEntityBase<WorkflowNodeWithRevision> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: WorkflowNodeWithRevisionEntity): WorkflowNodeWithRevisionEntity;
    load(this: any, reqmatch?: WorkflowNodeWithRevisionLoadMatch, ctrl?: Control): Promise<WorkflowNodeWithRevisionEntity>;
    create(this: any, reqdata?: WorkflowNodeWithRevisionCreateData, ctrl?: Control): Promise<WorkflowNodeWithRevisionEntity>;
}
export { WorkflowNodeWithRevisionEntity };
