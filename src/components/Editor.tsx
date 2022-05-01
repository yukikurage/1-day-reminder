import { createSignal } from 'solid-js';

const Editor = (props: {
  value: string;
  onClose: (value: string) => void;
  ref?: HTMLTextAreaElement;
}) => {
  const [text, setText] = createSignal(props.value);

  return (
    <textarea
      ref={props.ref}
      class="w-full h-full rounded-md p-1  font-mono outline-gray-300 resize-none"
      value={text()}
      onInput={(e) => {
        setText(e.currentTarget.value);
      }}
      onKeyDown={(e) => {
        if ((e.ctrlKey || e.metaKey) && e.key == 'Enter') {
          props.onClose(e.currentTarget.value);
        }
      }}
      onBlur={(e) => {
        props.onClose(e.currentTarget.value);
      }}
    />
  );
};

export default Editor;
