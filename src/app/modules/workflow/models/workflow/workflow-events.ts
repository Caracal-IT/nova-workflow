export class WorkflowEvents {
  static created(workflowId: string, name: string) {
    WorkflowEvents.dispatchEvent('wf-created', {
      workflowId: workflowId,
      name: name
    });
  }

  static loading(workflowId: string, name: string) {
    WorkflowEvents.dispatchEvent('wf-loading', {
      workflowId: workflowId,
      name: name
    });
  }

  static loaded(workflowId: string, name: string) {
    WorkflowEvents.dispatchEvent('wf-loaded', {
      workflowId: workflowId,
      name: name
    });
  }

  static changingState(workflowId: string, name: string, actName: string, actType: string) {
    WorkflowEvents.dispatchEvent('wf-changing-state', {
      workflowId: workflowId,
      name: name,
      actName: actName,
      actType: actType
    });
  }

  static changedState(workflowId: string, name: string, actName: string, actType: string) {
    WorkflowEvents.dispatchEvent('wf-changed-state', {
      workflowId: workflowId,
      name: name,
      actName: actName,
      actType: actType
    });
  }

  static activityNotFound(workflowId: string, name: string, actName: string) {
    WorkflowEvents.dispatchEvent('wf-activity-not-found', {
      workflowId: workflowId,
      name: name,
      actName: actName
    });
  }

  private static dispatchEvent(eventType: string, detail: any){
    window.dispatchEvent(
      new CustomEvent(eventType, {detail: detail})
    );
  }
}
