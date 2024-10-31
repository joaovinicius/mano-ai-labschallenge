import { useEffect, useRef, useState } from "react";
import { useValidatedState } from "@mantine/hooks";
import { JsonInput, Loader, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getClaim } from "~/services/claimsService";
import { formatJsonString } from "~/utils/helpers";

type ClaimDetailsProps = {
  fileName: string;
  editable?: boolean;
  removable?: boolean;
  onClickRemove?: () => void;
  onClickUpdate?: (value: string) => void;
};

export function ClaimDetails({ fileName, editable, removable, onClickRemove, onClickUpdate }: ClaimDetailsProps) {
  const jsonInputRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [{ value, lastValidValue, valid }, setJson] = useValidatedState(
    "",
    (val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    },
    true,
  );

  useEffect(() => {
    async function fetchJson() {
      setLoading(true);
      getClaim(fileName)
        .then((response) => {
          setJson(formatJsonString(response.data));
        })
        .catch((error) => {
          console.error(error);
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (fileName) {
      fetchJson();
    }
  }, [fileName]);

  if (!fileName) return null;

  return (
    <>
      {loading ? (
        <Loader color="blue" />
      ) : (
        <>
          <JsonInput
            ref={jsonInputRef}
            label="File"
            validationError="Invalid JSON"
            formatOnBlur
            autosize
            readOnly={!editable}
            minRows={4}
            value={value}
            onChange={(value) => {
              setJson(value);
            }}
          />
          <div className="flex justify-between pt-4">
            {removable && (
              <Button type="button" variant="filled" color="red" onClick={onClickRemove}>
                Remove
              </Button>
            )}
            {!valid && (
              <Button
                type="button"
                variant="filled"
                onClick={() => {
                  setJson(lastValidValue);
                  jsonInputRef.current?.focus();
                }}
              >
                Reset
              </Button>
            )}
            {editable && (
              <Button
                disabled={!valid}
                type="button"
                variant="filled"
                onClick={() => {
                  onClickUpdate(value);
                }}
              >
                Update
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
}
