import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { Campaign, CampaignLoadMatch, CampaignListMatch, CampaignCreateData } from '../LoopsTypes';
declare class CampaignEntity extends LoopsEntityBase<Campaign> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: CampaignEntity): CampaignEntity;
    load(this: any, reqmatch?: CampaignLoadMatch, ctrl?: Control): Promise<CampaignEntity>;
    list(this: any, reqmatch?: CampaignListMatch, ctrl?: Control): Promise<CampaignEntity[]>;
    create(this: any, reqdata?: CampaignCreateData, ctrl?: Control): Promise<CampaignEntity>;
}
export { CampaignEntity };
