// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {storage} from '../models';
import {model} from '../models';
import {edge} from '../models';
import {main} from '../models';
import {assitcli} from '../models';

export function GetLogsWithData():Promise<any>;

export function GetNetworkSchema(arg1:string):Promise<any>;

export function GetLocationSchema(arg1:string):Promise<any>;

export function AddConnection(arg1:storage.RubixConnection):Promise<storage.RubixConnection>;

export function AddHost(arg1:string,arg2:model.Host):Promise<model.Host>;

export function EditHost(arg1:string,arg2:string,arg3:model.Host):Promise<model.Host>;

export function GetConnection(arg1:string):Promise<storage.RubixConnection>;

export function GetHostInterfaces(arg1:string,arg2:string):Promise<edge.InterfaceNames>;

export function GetHostTime(arg1:string,arg2:string):Promise<any>;

export function GetLocation(arg1:string,arg2:string):Promise<model.Location>;

export function UpdateConnection(arg1:string,arg2:storage.RubixConnection):Promise<storage.RubixConnection>;

export function DeleteAllConnections():Promise<main.DeleteAllConnections>;

export function DeleteConnection(arg1:string):Promise<string>;

export function GetConnections():Promise<Array<storage.RubixConnection>>;

export function GetHost(arg1:string,arg2:string):Promise<model.Host>;

export function GetHostInternetIP(arg1:string,arg2:string):Promise<edge.InternetIP>;

export function GetHostNetwork(arg1:string,arg2:string):Promise<model.Network>;

export function PingRubixAssist(arg1:string):Promise<boolean>;

export function UpdateLocation(arg1:string,arg2:string,arg3:model.Location):Promise<model.Location>;

export function DeleteHost(arg1:string,arg2:string):Promise<assitcli.Response>;

export function DeleteLocation(arg1:string,arg2:string):Promise<assitcli.Response>;

export function GetHostNetworks(arg1:string):Promise<Array<model.Network>>;

export function PingHost(arg1:string,arg2:string):Promise<boolean>;

export function AddHostNetwork(arg1:string,arg2:model.Network):Promise<model.Network>;

export function DeleteHostNetwork(arg1:string,arg2:string):Promise<assitcli.Response>;

export function HostRubixScan(arg1:string,arg2:string):Promise<any>;

export function EditHostNetwork(arg1:string,arg2:string,arg3:model.Network):Promise<model.Network>;

export function GetHosts(arg1:string):Promise<Array<model.Host>>;

export function GetLocations(arg1:string):Promise<Array<model.Location>>;

export function AddLocation(arg1:string,arg2:model.Location):Promise<model.Location>;

export function GetHostActiveNetworks(arg1:string,arg2:string):Promise<any>;

export function GetLogsByConnection(arg1:string):Promise<any>;

export function GetConnectionSchema():Promise<main.ConnectionSchema>;

export function GetHostSchema(arg1:string):Promise<any>;

export function GetLogs():Promise<any>;
