import * as React from "react";

import classData, { getClass, getSpec } from "../../../../../../data/classes";
import {
  WowClassSafeName,
  WowSpecSafeName
} from "../../../../../../types/classes";

import * as STYLES from "./class-select.scss";

interface ClassSelectProps {
  selectedClass?: WowClassSafeName;
  selectedSpec?: WowSpecSafeName;
  onChange: (newValue: {
    class?: WowClassSafeName;
    spec?: WowSpecSafeName;
  }) => any;
  isLocked?: boolean;
}

const ClassSelect = ({
  selectedClass,
  selectedSpec,
  onChange,
  isLocked
}: ClassSelectProps) => {
  const classOptions = classData.map(c => (
    <option key={c.safeName} value={c.safeName}>
      {c.displayName}
    </option>
  ));

  let specOptions: JSX.Element[] = [];
  const selectedClassData = getClass(selectedClass);
  if (selectedClassData) {
    specOptions = selectedClassData.specialisations.map(s => (
      <option key={s.safeName} value={s.safeName}>
        {s.displayName}
      </option>
    ));
  }

  const selectedSpecData = getSpec(selectedClass, selectedSpec);

  const onClassChange = (newClass: WowClassSafeName) => {
    onChange({
      class: newClass,
      spec: undefined
    });
  };

  const onSpecChange = (newSpec: WowSpecSafeName) => {
    onChange({
      class: selectedClass,
      spec: newSpec
    });
  };

  const rootClasses = [STYLES.classSpecSelect];
  if (isLocked) rootClasses.push(STYLES.classSpecSelect__locked);

  return (
    <div
      className={rootClasses.join(" ")}
      {...{ "data-selected": selectedClass }}
    >
      {isLocked ? (
        <input
          className={STYLES.classSelectReadOnly}
          value={selectedClassData && selectedClassData.displayName}
          readOnly={true}
        />
      ) : (
        <select
          {...{ "data-required": !selectedClassData }}
          className={STYLES.classSelect}
          onChange={e => onClassChange(e.target.value as WowClassSafeName)}
          value={selectedClass || ""}
        >
          <option value="">Select a class</option>
          {classOptions}
        </select>
      )}

      {isLocked ? (
        <input
          className={STYLES.specSelectReadOnly}
          value={selectedSpecData && selectedSpecData.displayName}
          readOnly={true}
        />
      ) : (
        <select
          {...{ "data-required": !selectedSpecData }}
          disabled={!selectedClassData}
          className={STYLES.specSelect}
          onChange={e => onSpecChange(e.target.value as WowSpecSafeName)}
          value={selectedSpec || ""}
        >
          <option value="">Select a spec</option>
          {specOptions}
        </select>
      )}
    </div>
  );
};

export default ClassSelect;
