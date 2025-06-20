import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Button,
  Tailwind,
} from "@react-email/components";

type ResetPasswordEmailProps = {
  resetLink: string;
  name: string;
};

const ResetPasswordEmail = ({ resetLink, name }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white mx-auto my-10 p-6 rounded-md shadow-md max-w-md">
            <table
              align="center"
              border={0}
              cellPadding="0"
              cellSpacing="0"
              className="rounded-[12px] bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600"
              role="presentation"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #4f46e5, #3b82f6, #8b5cf6)",
                backgroundSize: "cover",
              }}
              width="100%"
            >
              <tbody>
                <tr>
                  <td align="center" className="p-[40px] text-center">
                    <Text className="m-0 text-sm font-medium text-gray-200">
                      {name}
                    </Text>

                    <Text className="m-0 text-sm font-medium text-gray-200">
                      Password Reset Request
                    </Text>
                    <Heading
                      as="h1"
                      className="m-0 mt-[8px] text-2xl font-bold text-white"
                    >
                      Reset Your Gaggleniti Password
                    </Heading>

                    <Button
                      className="mt-[24px] rounded-[8px] bg-white px-[32px] py-[12px] text-base font-semibold text-indigo-700 hover:bg-gray-100 border border-white border-solid"
                      href={resetLink}
                    >
                      Reset Password
                    </Button>

                    <Text className="mt-[16px] text-base leading-[24px] text-white">
                      We received a request to reset your password for your
                      Gaggle Niti account. Click the button below to create a
                      new password. If you didn t make this request, please
                      ignore this email.
                    </Text>

                    <Text className="mt-[24px] text-sm text-gray-200">
                      This link is valid for 30 minutes only.
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>

            <Text className="text-xs text-center text-gray-400 mt-6">
              &copy; {new Date().getFullYear()} Gaggleniti. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
