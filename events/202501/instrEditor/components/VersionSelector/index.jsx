import { useEffect, useState } from "react";

export default function VersionSelector({ onSelect }) {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    fetch("/api/list-object-versions")
      .then((res) => res.json())
      .then((data) => setVersions(data))
      .catch((err) => console.error("Error fetching versions:", err));
  }, []);

  return (
    <div>
      <label>選擇版本：</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        {versions?.map((v) => (
          <option key={v.VersionId} value={v.VersionId}>
            {new Date(v.LastModified).toLocaleString()} (ID: {v.VersionId})
          </option>
        ))}
      </select>
    </div>
  );
}
