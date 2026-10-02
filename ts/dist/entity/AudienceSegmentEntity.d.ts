import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { AudienceSegment, AudienceSegmentLoadMatch, AudienceSegmentListMatch, AudienceSegmentCreateData } from '../LoopsTypes';
declare class AudienceSegmentEntity extends LoopsEntityBase<AudienceSegment> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: AudienceSegmentEntity): AudienceSegmentEntity;
    load(this: any, reqmatch?: AudienceSegmentLoadMatch, ctrl?: Control): Promise<AudienceSegmentEntity>;
    list(this: any, reqmatch?: AudienceSegmentListMatch, ctrl?: Control): Promise<AudienceSegmentEntity[]>;
    create(this: any, reqdata?: AudienceSegmentCreateData, ctrl?: Control): Promise<AudienceSegmentEntity>;
}
export { AudienceSegmentEntity };
