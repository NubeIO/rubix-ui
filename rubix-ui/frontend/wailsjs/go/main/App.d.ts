// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {model} from '../models';
import {storage} from '../models';
import {assitcli} from '../models';
import {main} from '../models';

export function DeleteConnection(arg1:string):Promise<string>;

export function GetHostNetwork(arg1:string):Promise<model.Network>;

export function GetHostNetworks():Promise<Array<model.Network>>;

export function GetHosts():Promise<Array<model.Host>>;

export function GetLocations(arg1:string):Promise<Array<model.Location>>;

export function UpdateConnection(arg1:string,arg2:storage.RubixConnection):Promise<storage.RubixConnection>;

export function AddHostNetwork(arg1:model.Network):Promise<model.Network>;

export function DeleteHostNetwork(arg1:string):Promise<assitcli.Response>;

export function EditHost(arg1:string,arg2:model.Host):Promise<model.Host>;

export function EditHostNetwork(arg1:string,arg2:model.Network):Promise<model.Network>;

export function GetConnectionSchema():Promise<main.ConnectionSchema>;

export function GetHostSchema():Promise<any>;

export function AddConnection(arg1:storage.RubixConnection):Promise<storage.RubixConnection>;

export function DeleteHost(arg1:string):Promise<assitcli.Response>;

export function GetConnection(arg1:string):Promise<storage.RubixConnection>;

export function GetConnections():Promise<Array<storage.RubixConnection>>;

export function GetLocationSchema():Promise<any>;

export function GetNetworkSchema():Promise<any>;

export function AddHost(arg1:model.Host):Promise<model.Host>;

export function AddLocation(arg1:string,arg2:model.Location):Promise<model.Location>;

export function DeleteAllConnections():Promise<main.DeleteAllConnections>;

export function DeleteLocation(arg1:string,arg2:string):Promise<assitcli.Response>;

export function GetHost(arg1:string):Promise<model.Host>;

export function GetLocation(arg1:string,arg2:string):Promise<model.Location>;

export function UpdateLocation(arg1:string,arg2:string,arg3:model.Location):Promise<model.Location>;
