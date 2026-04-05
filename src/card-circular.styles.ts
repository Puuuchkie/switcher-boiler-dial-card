import { css } from 'lit';

export default css`
  ha-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
  }

  /* ── Dial wrapper ──────────────────────────────────────────────────────── */

  .timer-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 8px 4px 8px;
    container-type: inline-size;
  }

  .timer-svg {
    /*
     * Scale to the card's width, capped at 280 px.
     * aspect-ratio keeps it square regardless of parent height,
     * so the dial is always visible in vertical stacks, grids, etc.
     */
    width:  min(100cqw, 280px);
    aspect-ratio: 1 / 1;
    display: block;
    touch-action: none;
  }

  /* ── SVG text inside the dial ──────────────────────────────────────────── */

  .inner-name {
    font-size: 14px;
    fill: var(--secondary-text-color, #888);
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    pointer-events: all;
    cursor: pointer;
  }

  .center-value {
    font-size: 42px;
    fill: var(--primary-text-color);
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    pointer-events: none;
  }

  .center-unit {
    font-size: 13px;
    fill: var(--secondary-text-color, #888);
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    pointer-events: none;
  }

  .inner-state {
    font-size: 12px;
    fill: var(--primary-text-color);
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    pointer-events: none;
  }

  .inner-power {
    font-size: 11px;
    fill: var(--secondary-text-color, #888);
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    pointer-events: none;
  }

  /* ── Drag handle ───────────────────────────────────────────────────────── */

  .timer-handle {
    cursor: grab;
    touch-action: none;
  }

  .timer-handle.dragging {
    cursor: grabbing;
  }

  /* ── Power button ──────────────────────────────────────────────────────── */

  .bottom-controls {
    display: flex;
    padding: 0 8px 8px 8px;
    flex-shrink: 0;
  }

  .btn {
    height: 36px;
    border: none;
    border-radius: var(--control-button-border-radius, 10px);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 180ms ease-in-out;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    overflow: hidden;
    position: relative;
  }

  .btn-icon {
    --mdc-icon-size: 18px;
    line-height: 0;
  }

  .power-btn {
    flex: 1;
  }

  .power-btn.on {
    background-color: #F54436;
    color: #ffffff;
  }

  .power-btn.on .btn-icon { color: #ffffff; }

  .power-btn.on:hover  { background-color: #d43020; }

  .power-btn.off {
    background-color: rgba(158, 158, 158, 0.2);
    color: var(--primary-text-color);
  }

  .power-btn.off .btn-icon { color: var(--primary-text-color); }

  .power-btn.off:hover { background-color: rgba(158, 158, 158, 0.3); }
`;
