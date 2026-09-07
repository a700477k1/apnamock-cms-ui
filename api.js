const API_BASE = 'https://apnamock-api.apnamock.workers.dev/api/invoke';

const google = {
  script: {
    run: {
      withSuccessHandler: function(successFn) {
        return {
          withFailureHandler: function(failureFn) {
            return {
              invoke: async function(token, functionName, ...args) {
                try {
                  const response = await fetch(API_BASE, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, functionName, args })
                  });
                  const data = await response.json();
                  if (!response.ok || data.error) throw new Error(data.error || 'API Error');
                  successFn(data);
                } catch (err) {
                  if (failureFn) failureFn(err);
                }
              }
            };
          }
        };
      }
    }
  }
};
