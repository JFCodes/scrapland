import type { T_Execution } from '../../entities'

export type T_API_WEBSOCKET_ServerEvent_Connected = {
  payload: { clientId: string }
  type: 'connected'
}

export type T_API_WEBSOCKET_ServerEvent_Pong = {
  type: 'pong'
}

export type T_API_WEBSOCKET_ServerEvent_ExecutionQueued = {
  type: 'execution-queued',
  payload: T_Execution
}

export type T_API_WEBSOCKET_ServerEvent_ExecutionRunning = {
  type: 'execution-running',
  payload: T_Execution
}

export type T_API_WEBSOCKET_ServerEvent_ExecutionAborted = {
  type: 'execution-aborted',
  payload: T_Execution
}

export type T_API_WEBSOCKET_ServerEvent_ExecutionFailed = {
  type: 'execution-failed',
  payload: T_Execution
}

export type T_API_WEBSOCKET_ServerEvent_ExecutionCompleted = {
  type: 'execution-completed',
  payload: T_Execution
}

export type T_API_WEBSOCKET_ServerEvents =
  | T_API_WEBSOCKET_ServerEvent_ExecutionCompleted
  | T_API_WEBSOCKET_ServerEvent_ExecutionAborted
  | T_API_WEBSOCKET_ServerEvent_ExecutionRunning
  | T_API_WEBSOCKET_ServerEvent_ExecutionQueued
  | T_API_WEBSOCKET_ServerEvent_ExecutionFailed
  | T_API_WEBSOCKET_ServerEvent_Connected
  | T_API_WEBSOCKET_ServerEvent_Pong
