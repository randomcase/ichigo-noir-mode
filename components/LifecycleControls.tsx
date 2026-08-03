"use client";

type LifecycleControlsProps = {
  repo: string;
};

export default function LifecycleControls({ repo }: LifecycleControlsProps) {
  return (
    <div className="card">
      <h3>Lifecycle Controls</h3>
      <p>{repo}</p>
      <p>Symbolic-first controls are enabled by policy. Physical actions stay disabled by default.</p>
    </div>
  );
}