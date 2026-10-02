import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { Configuration, ConfigurationListMatch } from '../LoopsTypes';
declare class ConfigurationEntity extends LoopsEntityBase<Configuration> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: ConfigurationEntity): ConfigurationEntity;
    list(this: any, reqmatch?: ConfigurationListMatch, ctrl?: Control): Promise<ConfigurationEntity[]>;
}
export { ConfigurationEntity };
