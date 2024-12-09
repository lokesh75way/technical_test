"use client";
import React from "react";
import {
  Form,
  Input,
  Button,
  message,
  FormListFieldData,
  FormListOperation,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { createInterest } from "@/services/api";
import { setCookie } from "cookies-next/client";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";

interface InterestFormValues {
  userId: string;
  preferences: string[];
}

const InterestForm = () => {
  const [form] = Form.useForm<InterestFormValues>();
  const router = useRouter();

  const onFinish = async (values: InterestFormValues) => {
    try {
      await createInterest(values);
      message.success("Form submitted successfully!");
      form.resetFields();
      setCookie("userId", values.userId);
      router.push("/list");
    } catch (error: unknown) {
      console.log(error);
      // message.error(
      //   "Unable to fetch recommendations at this time. Please try again later."
      // );
    }
  };

  return (
    <Form<InterestFormValues>
      form={form}
      name="interest_form"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        userId: "",
        preferences: [
          "science fiction",
          "artificial intelligence",
          "space exploration",
        ],
      }}
      autoComplete="off"
      className={styles["form"]}
    >
      {/* User ID Field */}
      <Form.Item
        label="User ID"
        name="userId"
        rules={[
          { required: true, message: "User ID is required" },
          { type: "string", message: "User ID must be a string" },
        ]}
      >
        <Input placeholder="Enter your User ID" />
      </Form.Item>

      {/* Dynamic preferences */}
      <Form.Item
        name="preferences"
        label="Preferences"
        rules={[
          {
            validator: async (_: unknown, preferences?: string[]) => {
              if (!preferences || preferences.length === 0) {
                return Promise.reject(
                  new Error("At least one preference is required.")
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Form.List
          name="preferences"
          rules={[
            {
              validator: async (_: unknown, preferences?: string[]) => {
                if (!preferences || preferences.length === 0) {
                  return Promise.reject(
                    new Error("At least one preference is required.")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          {(
            fields: FormListFieldData[],
            { add, remove }: FormListOperation
          ) => (
            <>
              {fields.map(({ key, name, fieldKey = 0, ...restField }) => (
                <div className={styles["field-with-icon"]} key={key}>
                  <Form.Item
                    {...restField}
                    name={[name]}
                    fieldKey={[fieldKey]}
                    style={{ marginBottom: 0, flex: 1 }}
                    rules={[
                      { required: true, message: "Preference is required" },
                    ]}
                  >
                    <Input placeholder="Enter preference" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Preference
              </Button>
            </>
          )}
        </Form.List>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InterestForm;
