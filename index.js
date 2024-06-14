import type {
  BaseIssue,
  BaseValidation,
  Dataset,
  ErrorMessage,
} from '../../types/index.ts';
import { _addIssue } from '../../utils/index.ts';

/**
 * URL issue type.
 */
export interface UrlIssue<TInput extends string> extends BaseIssue<TInput> {
  /**
   * The issue kind.
   */
  readonly kind: 'validation';
  /**
   * The issue type.
   */
  readonly type: 'url';
  /**
   * The expected property.
   */
  readonly expected: null;
  /**
   * The received property.
   */
  readonly received: `"${string}"`;
  /**
   * The validation function.
   */
  readonly requirement: (input: string) => boolean;
}

/**
 * URL action type.
 */
export interface UrlAction<
  TInput extends string,
  TMessage extends ErrorMessage<UrlIssue<TInput>> | undefined,
> extends BaseValidation<TInput, TInput, UrlIssue<TInput>> {
  /**
   * The action type.
   */
  readonly type: 'url';
  /**
   * The action reference.
   */
  readonly reference: typeof url;
  /**
   * The expected property.
   */
  readonly expects: null;
  /**
   * The validation function.
   */
  readonly requirement: (input: string) => boolean;
  /**
   * The error message.
   */
  readonly message: TMessage;
}

/**
 * Creates a [URL](https://en.wikipedia.org/wiki/URL) validation action.
 *
 * Hint: The value is passed to the URL constructor to check if it is valid.
 * This check is not perfect. For example, values like "abc:1234" are accepted.
 *
 * @returns A URL action.
 */
export function url<TInput extends string>(): UrlAction<TInput, undefined>;

/**
 * Creates a [URL](https://en.wikipedia.org/wiki/URL) validation action.
 *
 * Hint: The value is passed to the URL constructor to check if it is valid.
 * This check is not perfect. For example, values like "abc:1234" are accepted.
 *
 * @param message The error message.
 *
 * @returns A URL action.
 */
export function url<
  TInput extends string,
  const TMessage extends ErrorMessage<UrlIssue<TInput>> | undefined,
>(message: TMessage): UrlAction<TInput, TMessage>;

export function url(
  message?: ErrorMessage<UrlIssue<string>> | undefined
): UrlAction<string, ErrorMessage<UrlIssue<string>> | undefined> {
  return {
    kind: 'validation',
    type: 'url',
    reference: url,
    async: false,
    expects: null,
    requirement(input) {
      try {
        new URL(input);
        return true;
      } catch {
        return false;
      }
    },
    message,
    _run(dataset, config) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, 'URL', dataset, config);
      }
      return dataset as Dataset<string, UrlIssue<string>>;
    },
  };
}