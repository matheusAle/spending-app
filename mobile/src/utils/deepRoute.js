
export function deepRoute(from, component) {

  component.router = {
    ...from.router,
    getStateForAction: (action, lastState) => {
      return from.router.getStateForAction(action, lastState);
    },
  };

  return component
}
